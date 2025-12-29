import { Component, OnInit, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParfumService } from '../../services/parfum.service';
import { CartService } from '../../services/cart.service';
import { Parfum } from '../../models/parfum.model';
import { ProductModalComponent } from '../../components/product-modal/product-modal';

@Component({
  selector: 'app-boutique',
  standalone: true,
  imports: [CommonModule, ProductModalComponent],
  templateUrl: './boutique.html',
  styleUrls: ['./boutique.scss']
})
export class BoutiqueComponent implements OnInit {
  
  private parfumService = inject(ParfumService);
  private cartService = inject(CartService);
  
  categoryList: Parfum[] = []; 
  globalList: Parfum[] = [];   
  parfums: Parfum[] = [];
  
  // 🔥 VARIABLES OPTIMISATION
  displayedParfums: Parfum[] = [];
  itemsToShow = 6;
  batchSize = 6;
  
  activeCategory: 'femmes' | 'hommes' | 'luxe' = 'femmes';
  isLoading = false;
  selectedProduct: Parfum | null = null;
  currentSearchTerm = ''; 

  ngOnInit() {
    this.chargerParfums('femmes');

    this.parfumService.getAllParfumsCombined().subscribe(data => {
      this.globalList = data;
    });

    this.parfumService.search$.subscribe(term => {
      this.currentSearchTerm = term;
      this.applyFilter();
    });

    this.parfumService.productOpen$.subscribe(product => {
      if (product) {
        if (product.categorie === 'Homme') this.activeCategory = 'hommes';
        else if (product.categorie === 'Femme') this.activeCategory = 'femmes';
        else if (product.categorie === 'Unisex') this.activeCategory = 'luxe';
        
        this.openModal(product);
        this.parfumService.clearOpenModal();
      }
    });
  }

  // --- SCROLL EVENT LISTENER ---
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight;
    const max = document.documentElement.scrollHeight;

    if (pos >= max - 200) {
      this.loadMore();
    }
  }

  // 🔥 1. LISTENER BOUTON RETOUR (Mobile)
  // Hetha yasma3 ki tenzel Retour fi telephone
  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    // Ken l modal ma7loula
    if (this.selectedProduct) {
      // Sakkerha direct (bla ma tarja3 page lteli, khater deja sar retour)
      this.selectedProduct = null;
      document.body.style.overflow = 'auto';
    }
  }

  loadMore() {
    if (this.displayedParfums.length < this.parfums.length) {
      this.itemsToShow += this.batchSize;
      this.updateDisplayedList();
    }
  }

  chargerParfums(categorie: 'femmes' | 'hommes' | 'luxe') {
    this.activeCategory = categorie;
    this.isLoading = true;
    
    this.parfumService.getParfums(categorie).subscribe({
      next: (data) => {
        this.categoryList = data;
        this.applyFilter();
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  onTabClick(categorie: 'femmes' | 'hommes' | 'luxe') {
    this.parfumService.updateSearchTerm(''); 
    this.chargerParfums(categorie);
  }

  applyFilter() {
    this.itemsToShow = this.batchSize;

    if (this.currentSearchTerm && this.currentSearchTerm.trim() !== '') {
      const term = this.currentSearchTerm.toLowerCase();
      this.parfums = this.globalList.filter(p => 
        p.nom.toLowerCase().includes(term) || 
        p.code.toLowerCase().includes(term)
      );

      if (this.parfums.length > 0) {
        const firstMatch = this.parfums[0];
        if (firstMatch.categorie === 'Homme') this.activeCategory = 'hommes';
        else if (firstMatch.categorie === 'Femme') this.activeCategory = 'femmes';
        else if (firstMatch.categorie === 'Unisex') this.activeCategory = 'luxe';
      }
    } else {
      this.parfums = [...this.categoryList];
    }

    this.updateDisplayedList();
  }

  updateDisplayedList() {
    this.displayedParfums = this.parfums.slice(0, this.itemsToShow);
  }

  // 🔥 2. OPEN MODAL (Avec Historique)
  openModal(product: Parfum) {
    this.selectedProduct = product;
    document.body.style.overflow = 'hidden'; 
    
    // Zidna hethi: N9oulo lel browser "rani 3malt action"
    // Bech ki tenzel retour, yarja3 etape lteli (fassa5 hethi) w ydeclanchi onPopState
    window.history.pushState({ modal: true }, '', window.location.href);
  }

  // 🔥 3. CLOSE MODAL (Avec nettoyage Historique)
  closeModal() {
    // Nthabtou sa3a elli hiya ma7loula
    if (this.selectedProduct) {
      this.selectedProduct = null;
      document.body.style.overflow = 'auto'; 

      window.history.back();
    }
  }

  handleAddToCart(event: any) {
    this.cartService.addToCart(event);
    this.closeModal();
  }



clearSearch() {
    this.parfumService.updateSearchTerm(''); // Hethi tfarragh service + navbar
    // El reste (applyFilter etc.) يصير وحدو خاطرنا عاملين subscribe
  }
}
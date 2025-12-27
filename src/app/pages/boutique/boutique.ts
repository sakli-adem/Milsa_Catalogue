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
  parfums: Parfum[] = []; // Liste filtrée KAMLA (ex: 50 parfums)
  
  // 🔥 VARIABLES OPTIMISATION 🔥
  displayedParfums: Parfum[] = []; // Liste elli tban fel Ecran (ex: 8, mba3d 16...)
  itemsToShow = 5; // Bdech nebda
  batchSize = 5;   // B9adeh nzid
  
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
  // Hethi tfi9 bik ki t9arreb lel 9a3a mta3 page
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Nchoufou position scroll
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight;
    const max = document.documentElement.scrollHeight;

    // Ken wsolna 9rib lel 9a3a (b9ina 100px par exemple)
    if (pos >= max - 200) {
      this.loadMore();
    }
  }

  // Zid 8 produits jdod
  loadMore() {
    // Ken mazal famma ma nzidou
    if (this.displayedParfums.length < this.parfums.length) {
      this.itemsToShow += this.batchSize; // Zid 8 fel compteur
      this.updateDisplayedList(); // Mise à jour l affichage
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
    // 1. Reset Compteur (Dima narj3ou l 8 ki nbadlou filtre)
    this.itemsToShow = this.batchSize;

    if (this.currentSearchTerm && this.currentSearchTerm.trim() !== '') {
      const term = this.currentSearchTerm.toLowerCase();
      this.parfums = this.globalList.filter(p => 
        p.nom.toLowerCase().includes(term) || 
        p.code.toLowerCase().includes(term)
      );

      // Auto-switch visual logic
      if (this.parfums.length > 0) {
        const firstMatch = this.parfums[0];
        if (firstMatch.categorie === 'Homme') this.activeCategory = 'hommes';
        else if (firstMatch.categorie === 'Femme') this.activeCategory = 'femmes';
        else if (firstMatch.categorie === 'Unisex') this.activeCategory = 'luxe';
      }
    } else {
      this.parfums = [...this.categoryList];
    }

    // 🔥 A jour l'affichage initial
    this.updateDisplayedList();
  }

  // Hethi ta9sam lista l kbira w ta3ti chwaya lel ecran
  updateDisplayedList() {
    this.displayedParfums = this.parfums.slice(0, this.itemsToShow);
  }

  openModal(product: Parfum) {
    this.selectedProduct = product;
    document.body.style.overflow = 'hidden'; 
  }

  closeModal() {
    this.selectedProduct = null;
    document.body.style.overflow = 'auto'; 
  }

  handleAddToCart(event: any) {
    this.cartService.addToCart(event);
    this.closeModal();
  }
}
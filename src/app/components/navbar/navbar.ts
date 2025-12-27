import { Component, HostListener, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Services & Models
import { CartService } from '../../services/cart.service';
import { ParfumService } from '../../services/parfum.service';
import { Parfum } from '../../models/parfum.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule], 
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent implements OnInit {
  
  private router = inject(Router);
  private cartService = inject(CartService);
  private parfumService = inject(ParfumService);

  isMenuOpen = false;
  isScrolled = false;
  cartItemCount = 0;
  
  // Variables Recherche
  searchTerm: string = '';
  allProducts: Parfum[] = [];
  suggestions: Parfum[] = [];
  showSuggestions = false;

  ngOnInit() {
    // 1. Panier
    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
    });

    // 2. Charger Stock Global pour Autocomplete
    this.parfumService.getAllParfumsCombined().subscribe(data => {
      this.allProducts = data;
    });
  }

  // Quand on écrit dans l'input
  onSearchInput() {
    this.parfumService.updateSearchTerm(this.searchTerm);

    if (this.searchTerm.length > 0) {
      const term = this.searchTerm.toLowerCase();
      this.suggestions = this.allProducts.filter(p => 
        p.nom.toLowerCase().includes(term) || 
        p.code.toLowerCase().includes(term)
      ).slice(0, 5); // Max 5 résultats
      this.showSuggestions = true;
    } else {
      this.suggestions = [];
      this.showSuggestions = false;
    }
  }

  // 🔥 CLICK SUR SUGGESTION (C'est ici que ça se passe)
  selectSuggestion(parfum: Parfum) {
    this.searchTerm = parfum.nom; 
    this.showSuggestions = false; 

    // 1. Envoyer le terme pour filtrer la grille
    this.parfumService.updateSearchTerm(parfum.nom);
    
    // 2. 🔥 Envoyer le signal pour OUVRIR LE MODAL DIRECTEMENT
    this.parfumService.triggerOpenModal(parfum);
    
    // 3. Aller vers la boutique si on n'y est pas
    if (this.router.url !== '/boutique') {
      this.router.navigate(['/boutique']);
    }
  }

  // Click sur Loupe ou Entrée
  onSearchSubmit() {
    this.showSuggestions = false;
    if (this.searchTerm.length > 0 && this.router.url !== '/boutique') {
      this.router.navigate(['/boutique']);
    }
  }

  // UI Logic
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : 'auto';
  }

  @HostListener('window:scroll', [])
  onWindowScroll() { this.isScrolled = window.scrollY > 50; }

  scrollToSection(sectionId: string): void {
    this.isMenuOpen = false;
    document.body.style.overflow = 'auto';
    if (this.router.url === '/') {
      this.doScroll(sectionId);
    } else {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => { this.doScroll(sectionId); }, 100);
      });
    }
  }

  private doScroll(id: string) {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - headerOffset,
        behavior: "smooth"
      });
    }
  }
}
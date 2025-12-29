import { Component, HostListener, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';

// Services & Models (Assurez-vous que les chemins sont corrects)
import { CartService } from '../../services/cart.service';
import { ParfumService } from '../../services/parfum.service';
import { Parfum } from '../../models/parfum.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './navbar.html', // Thabbet esm fichier html
  styleUrls: ['./navbar.scss']   // Thabbet esm fichier scss
})
export class NavbarComponent implements OnInit {

  // Injections (Nouvelle syntaxe Angular 16+)
  private router = inject(Router);
  private cartService = inject(CartService);
  private parfumService = inject(ParfumService);

  // Variables UI
  isMenuOpen = false;
  isScrolled = false;
  cartItemCount = 0;

  // Variables Recherche
  searchTerm: string = '';
  allProducts: Parfum[] = [];
  suggestions: Parfum[] = [];
  showSuggestions = false;

  ngOnInit() {
    // 1. Abonnement au Panier
    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
    });

    // 2. Charger les parfums pour l'Autocomplete
    this.parfumService.getAllParfumsCombined().subscribe(data => {
      this.allProducts = data;
    });

    // 🔥 3. SOLUTION PRO: Fermer le menu automatiquement après chaque navigation
    // Hetha yasma3 el Router, dès que page tetbaddel (wala lien Apropos), ysakker menu
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.closeMenu();
    });
  }

  // --- LOGIQUE MENU MOBILE ---
  
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    // Bloquer le scroll quand le menu est ouvert
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : 'auto';
  }

  // Fonction spécifique pour fermer (utilisée par le Router event)
  closeMenu(): void {
    this.isMenuOpen = false;
    document.body.style.overflow = 'auto'; // Rrajja3 scroll
  }

  // --- LOGIQUE RECHERCHE ---

  onSearchInput() {
    this.parfumService.updateSearchTerm(this.searchTerm);

    if (this.searchTerm.length > 0) {
      const term = this.searchTerm.toLowerCase();
      this.suggestions = this.allProducts.filter(p => 
        p.nom.toLowerCase().includes(term) || 
        p.code.toLowerCase().includes(term)
      ).slice(0, 5); // Max 5 suggestions
      this.showSuggestions = true;
    } else {
      this.suggestions = [];
      this.showSuggestions = false;
    }
  }

  // Click sur une suggestion
  selectSuggestion(parfum: Parfum) {
    this.searchTerm = parfum.nom;
    this.showSuggestions = false;
    this.closeMenu(); // Sakker menu fel mobile

    // 1. Envoyer filtre
    this.parfumService.updateSearchTerm(parfum.nom);
    
    // 2. Ouvrir Modal
    this.parfumService.triggerOpenModal(parfum);
    
    // 3. Aller vers boutique si on n'y est pas
    if (this.router.url !== '/boutique') {
      this.router.navigate(['/boutique']);
    }
  }

  // Click Entrée ou Loupe
  onSearchSubmit() {
    this.showSuggestions = false;
    this.closeMenu(); // Sakker menu fel mobile
    
    if (this.searchTerm.length > 0 && this.router.url !== '/boutique') {
      this.router.navigate(['/boutique']);
    }
  }

  // --- SCROLL EFFECT ---
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Ajoute une classe .scrolled au navbar si on descend > 50px
    this.isScrolled = window.scrollY > 50;
  }
}
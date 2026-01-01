import { Component, HostListener, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';

// Services & Models
import { CartService } from '../../services/cart.service';
import { ParfumService } from '../../services/parfum.service';
import { Parfum } from '../../models/parfum.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavbarComponent implements OnInit {

  // 🔥 1. Correction: Raddinahom 'public' bech l HTML yrahom fel Build
  public router = inject(Router);
  public cartService = inject(CartService);
  public parfumService = inject(ParfumService);

  isMenuOpen = false;
  isScrolled = false;
  cartItemCount = 0;

  searchTerm: string = '';
  allProducts: Parfum[] = [];
  suggestions: Parfum[] = [];
  showSuggestions = false;

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
    });

    this.parfumService.getAllParfumsCombined().subscribe(data => {
      this.allProducts = data;
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.closeMenu();
    });

    this.parfumService.search$.subscribe(term => {
      this.searchTerm = term; 
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : 'auto';
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    document.body.style.overflow = 'auto';
  }

  onSearchInput() {
    this.parfumService.updateSearchTerm(this.searchTerm);

    if (this.searchTerm.length > 0) {
      const term = this.searchTerm.toLowerCase();
      this.suggestions = this.allProducts.filter(p => 
        p.nom.toLowerCase().includes(term) || 
        p.code.toLowerCase().includes(term)
      ).slice(0, 5);
      this.showSuggestions = true;
    } else {
      this.suggestions = [];
      this.showSuggestions = false;
    }
  }

  selectSuggestion(parfum: Parfum) {
    this.searchTerm = parfum.nom;
    this.showSuggestions = false;
    this.closeMenu();

    this.parfumService.updateSearchTerm(parfum.nom);
    this.parfumService.triggerOpenModal(parfum);
    
    if (this.router.url !== '/boutique') {
      this.router.navigate(['/boutique']);
    }
  }

  onSearchSubmit() {
    this.showSuggestions = false;
    this.closeMenu();
    
    if (this.searchTerm.length > 0 && this.router.url !== '/boutique') {
      this.router.navigate(['/boutique']);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }
}
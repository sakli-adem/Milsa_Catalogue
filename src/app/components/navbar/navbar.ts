import { Component, HostListener, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
// ⚠️ Importina el Service
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent implements OnInit {
  
  // Injecti services
  private router = inject(Router);
  private cartService = inject(CartService);

  isMenuOpen = false;
  isScrolled = false;
  
  // Hethi l variable elli bch twalli dynamique
  cartItemCount = 0; 

  ngOnInit() {
    // 👀 Nra9bou el Panier: Ay changement ysir, na7sbou l quantité jdida
    this.cartService.cartItems$.subscribe(items => {
      // Reduce: Hiya faza bech tajma3 les quantités mta3 les articles lkol
      this.cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : 'auto';
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  // Fonction Navigation Intelligente (Scroll ken home, Navigate ken page o5ra)
  scrollToSection(sectionId: string): void {
    this.isMenuOpen = false;
    document.body.style.overflow = 'auto';

    if (this.router.url === '/') {
      this.doScroll(sectionId);
    } else {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          this.doScroll(sectionId);
        }, 100);
      });
    }
  }

  private doScroll(id: string) {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }
}
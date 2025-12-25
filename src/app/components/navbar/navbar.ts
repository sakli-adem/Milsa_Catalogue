import { Component, HostListener } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent {
  
  isMenuOpen = false;
  isScrolled = false;
  cartItemCount = 2;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  // --- FONCTION SCROLL JDIDA ---
  scrollToSection(sectionId: string): void {
    // 1. Sakker el menu (kenou ma7loul fel mobile)
    this.isMenuOpen = false;
    document.body.style.overflow = 'auto';

    // 2. Lawwaj 3al element bel ID
    const element = document.getElementById(sectionId);
    if (element) {
      // 3. Scrollilou b na3ouma (Smooth)
      // Nna9sou chwaya (ex: -100px) bch l navbar matghattich etitre
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }
}
import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Catalog } from '../../catalog.model'; 
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  templateUrl: './catalogue.html',  // Thabet elli esm fichier html hakka
  styleUrl: './catalogue.scss'      // Thabet elli esm fichier scss hakka
})
export class CatalogueComponent {

  // --- DATA ---
  catalogs: Catalog[] = [
    {
      id: 1,
      title: 'Collection Femme',
      coverImage: 'images/cat1/cover.webp',
      images: [
        'images/cat1/2.webp', 'images/cat1/3.webp', 'images/cat1/4.webp',
        'images/cat1/5.webp', 'images/cat1/6.webp', 'images/cat1/7.webp', 'images/cat1/8.webp'
      ]
    },
    {
      id: 2,
      title: 'Collection Homme',
      coverImage: 'images/cat2/cover.webp',
      images: [
        'images/cat2/10.webp', 'images/cat2/11.webp', 'images/cat2/12.webp',
        'images/cat2/13.webp', 'images/cat2/14.webp'
      ]
    },
    {
      id: 3,
      title: 'Collection Mixte',
      coverImage: 'images/cat3/cover.webp',
      images: [
        'images/cat3/16.webp', 'images/cat3/17.webp', 'images/cat3/18.webp', 'images/cat3/19.webp'
      ]
    }
  ];

  selectedCatalog: Catalog | null = null;
  currentSlideIndex: number = 0;

  // --- VARIABLES SWIPE (POUR MOBILE) ---
  touchStartX: number = 0;
  touchEndX: number = 0;

  // --- ACTIONS ---

  openCatalog(catalog: Catalog): void {
    this.selectedCatalog = catalog;
    this.currentSlideIndex = 0;
    document.body.style.overflow = 'hidden'; 
  }

  closeCatalog(): void {
    this.selectedCatalog = null;
    document.body.style.overflow = 'auto';
  }

  nextSlide(): void {
    if (!this.selectedCatalog) return;
    if (this.currentSlideIndex < this.selectedCatalog.images.length - 1) {
      this.currentSlideIndex++;
    } else {
      this.currentSlideIndex = 0; // Loop
    }
  }

  prevSlide(): void {
    if (!this.selectedCatalog) return;
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
    } else {
      this.currentSlideIndex = this.selectedCatalog.images.length - 1; // Loop
    }
  }

  // --- LOGIC SWIPE ---

  swipeStart(e: TouchEvent): void {
    this.touchStartX = e.changedTouches[0].screenX;
  }

  swipeEnd(e: TouchEvent): void {
    this.touchEndX = e.changedTouches[0].screenX;
    this.handleSwipe();
  }

  handleSwipe(): void {
    const swipeThreshold = 50; // Sensibilité
    if (this.touchStartX - this.touchEndX > swipeThreshold) {
      this.nextSlide(); // Swipe Left -> Next
    }
    if (this.touchEndX - this.touchStartX > swipeThreshold) {
      this.prevSlide(); // Swipe Right -> Prev
    }
  }
}
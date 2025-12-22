import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Catalog } from './catalog.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './app.html',      // <--- Hethom baddelthomlek bch yemchiw m3a fichiers mte3k
  styleUrls: ['./app.scss']       // <---
})
export class AppComponent {
  
  // 1. DATA (Chemin mta3 tsawer walla "images/..." direct khaterhom fi public)
  catalogs: Catalog[] = [
    {
      id: 1,
      title: '',
      coverImage: 'images/cat1/cover.png',
      images: [
        'images/cat1/2.webp',
        'images/cat1/3.webp',
        'images/cat1/4.webp',
        'images/cat1/5.webp',
        'images/cat1/6.webp',
        'images/cat1/7.webp',
        'images/cat1/8.webp',
      ]
    },
    {
      id: 2,
      title: '',
      coverImage: 'images/cat2/cover.png',
      images: [
        'images/cat2/10.webp',
        'images/cat2/11.webp',
        'images/cat2/12.webp',
        'images/cat2/13.webp',
        'images/cat2/14.webp',
      ]
    },
    {
      id: 3,
      title: '',
      coverImage: 'images/cat3/cover.png',
      images: [
        'images/cat3/16.png',
        'images/cat3/17.png',
        'images/cat3/18.png',
        'images/cat3/19.png',
      ]
    }
  ];

  selectedCatalog: Catalog | null = null;
  currentSlideIndex: number = 0;

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
      this.currentSlideIndex = 0; 
    }
  }

  prevSlide(): void {
    if (!this.selectedCatalog) return;
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
    } else {
      this.currentSlideIndex = this.selectedCatalog.images.length - 1;
    }
  }
}
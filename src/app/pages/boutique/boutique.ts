import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// Imports Services
import { ParfumService } from '../../services/parfum.service';
import { CartService } from '../../services/cart.service';
// Import Models & Components
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
  
  parfums: Parfum[] = [];
  activeCategory: 'femmes' | 'hommes' | 'luxe' = 'femmes';
  isLoading = false;


  selectedProduct: Parfum | null = null; 

  ngOnInit() {
    this.chargerParfums('femmes');
  }

  chargerParfums(categorie: 'femmes' | 'hommes' | 'luxe') {
    this.activeCategory = categorie;
    this.isLoading = true;
    
    this.parfums = []; // Nvidiw list 9bal ma ncharjiw
    
    this.parfums = []; 
    this.parfumService.getParfums(categorie).subscribe({
      next: (data) => {
        this.parfums = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur chargement parfums', err);
        this.isLoading = false;
      }
    });
  }

  // 1. T7ell Modal
  openModal(product: Parfum) {
    this.selectedProduct = product;
    document.body.style.overflow = 'hidden'; // Bloqui scroll page wra
  }

  // 2. Tsakker Modal
  closeModal() {
    this.selectedProduct = null;
    document.body.style.overflow = 'auto'; // Rajja3 scroll
  }

  // 3. ACTION: Zid fel Panier
  handleAddToCart(event: any) {
    // event fih: { product, variant, quantity }
    
    this.cartService.addToCart({
      product: event.product,
      variant: event.variant,
      quantity: event.quantity
    });

    // Nsakkrou l modal direct
    this.closeModal();
  }
}
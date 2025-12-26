import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Parfum, Variante } from '../../models/parfum.model';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-modal.html',
  styleUrls: ['./product-modal.scss']
})
export class ProductModalComponent implements OnInit {
  
  @Input() product!: Parfum;          // Produit elli bch naffichiwah
  @Output() close = new EventEmitter<void>(); // Event bech nsakkrou modal
  @Output() addToCart = new EventEmitter<any>(); // Event bech nzidou panier

  selectedVariant!: Variante; // El volume elli 5tarou l client

  ngOnInit() {
    // Par défaut, n7ottou awel volume (ex: 35ml)
    if (this.product && this.product.variantes.length > 0) {
      this.selectedVariant = this.product.variantes[0];
    }
  }

  // Ki ybaddel l volume (35ml -> 100ml)
  selectVariant(v: Variante) {
    this.selectedVariant = v;
  }

  // Ki yenzel "Ajouter au panier"
  onAddToCart() {
    const item = {
      product: this.product,
      variant: this.selectedVariant,
      quantity: 1
    };
    this.addToCart.emit(item);
    this.close.emit(); // Nsakkrou modal ba3d l ajout (optionnel)
  }
}
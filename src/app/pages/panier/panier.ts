import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart.model';
import { CheckoutModalComponent } from '../../components/checkout-modal/checkout-modal';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, RouterLink, CheckoutModalComponent], 
  templateUrl: './panier.html',
  styleUrls: ['./panier.scss']
})
export class PanierComponent implements OnInit {

  private cartService = inject(CartService);
  
  cartItems: CartItem[] = [];
  totalPrice = 0;

  showCheckoutModal = false; 

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((acc, item) => acc + (item.variant.prix * item.quantity), 0);
  }

  increaseQty(item: CartItem) {
    this.cartService.updateQuantity(item, item.quantity + 1);
  }

  decreaseQty(item: CartItem) {
    this.cartService.updateQuantity(item, item.quantity - 1);
  }

  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item);
  }

  openCheckout() {
    if (this.cartItems.length > 0) {
      this.showCheckoutModal = true;
    }
  }


  onOrderSuccess() {
    this.cartService.clearCart();   
    this.showCheckoutModal = false; 

  }
}
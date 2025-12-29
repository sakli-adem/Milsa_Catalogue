import { Component, inject, OnInit, HostListener } from '@angular/core';
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

  // 🔥 1. LISTENER RETOUR MOBILE
  // Hetha yasma3 ki tenzel Retour fi telephone
  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    if (this.showCheckoutModal) {
      // Sakker modal w rajja3 scroll
      this.showCheckoutModal = false;
      document.body.style.overflow = 'auto';
    }
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

  // 🔥 2. OPEN MODAL (Avec Historique)
  openCheckout() {
    if (this.cartItems.length > 0) {
      this.showCheckoutModal = true;
      document.body.style.overflow = 'hidden';
      
      // Nzidou etape fictive fel historique
      window.history.pushState({ modal: true }, '', window.location.href);
    }
  }

  // 🔥 3. CLOSE MODAL MANUEL (Ki tenzel X)
  closeCheckout() {
    if (this.showCheckoutModal) {
      this.showCheckoutModal = false;
      document.body.style.overflow = 'auto';
      
      // Nraj3ou l historique etape lteli (clean up)
      window.history.back();
    }
  }

  // 🔥 4. SUCCESS ORDER
  onOrderSuccess() {
    this.cartService.clearCart();   
    if (this.showCheckoutModal) {
        this.showCheckoutModal = false;
        document.body.style.overflow = 'auto';
        window.history.back();
    }
  }
}
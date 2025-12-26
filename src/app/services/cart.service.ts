import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor() {}

  addToCart(item: CartItem) {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(i => 
      i.product.code === item.product.code && 
      i.variant.volume === item.variant.volume
    );

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      currentItems.push(item);
    }
    this.updateCart(currentItems);
  }


  removeFromCart(item: CartItem) {
    const currentItems = this.cartItems.value;
    const newItems = currentItems.filter(i => 
      !(i.product.code === item.product.code && i.variant.volume === item.variant.volume)
    );
    this.updateCart(newItems);
  }


  updateQuantity(item: CartItem, quantity: number) {
    const currentItems = this.cartItems.value;
    const targetItem = currentItems.find(i => 
      i.product.code === item.product.code && 
      i.variant.volume === item.variant.volume
    );

    if (targetItem) {
      targetItem.quantity = quantity;
      if (targetItem.quantity <= 0) {
        this.removeFromCart(item);
        return;
      }
    }
    this.updateCart(currentItems);
  }


  clearCart() {
    this.updateCart([]);
  }


  private updateCart(items: CartItem[]) {
    this.cartItems.next([...items]);
  }

  getTotalPrice(): number {
    return this.cartItems.value.reduce((total, item) => total + (item.variant.prix * item.quantity), 0);
  }
}
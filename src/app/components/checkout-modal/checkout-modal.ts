import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import emailjs from '@emailjs/browser';
import { CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-checkout-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout-modal.html',
  styleUrls: ['./checkout-modal.scss']
})
export class CheckoutModalComponent {

  @Input() cartItems: CartItem[] = []; 
  @Input() totalPrice: number = 0;     
  @Output() close = new EventEmitter<void>(); 
  @Output() orderConfirmed = new EventEmitter<void>(); 


  formData = {
    nom: '',
    telephone: '',
    email: '',
    adresse: ''
  };

  isSubmitting = false;

  submitOrder() {

    if (!this.formData.nom || !this.formData.telephone || !this.formData.adresse) {
      alert("Veuillez remplir les champs obligatoires (*)");
      return;
    }

    this.isSubmitting = true;


    const orderDetails = this.cartItems.map(item => 
      `- ${item.product.nom} (${item.variant.volume}) x${item.quantity} : ${item.variant.prix * item.quantity} TND`
    ).join('\n');


    const emailParams = {
      to_name: this.formData.nom,
      phone: this.formData.telephone,
      email: this.formData.email || 'Non fourni',
      address: this.formData.adresse,
      order_details: orderDetails,
      total_price: this.totalPrice + 7 
    };

 
    emailjs.send('SERVICE_ID', 'TEMPLATE_ID', emailParams, 'PUBLIC_KEY')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('✅ Commande envoyée avec succès ! Nous vous contacterons bientôt.');
        this.orderConfirmed.emit(); 
        this.close.emit(); 
      }, (err) => {
        console.error('FAILED...', err);
        alert('❌ Erreur lors de l\'envoi. Veuillez réessayer ou nous appeler.');
        this.isSubmitting = false;
      });
  }
}
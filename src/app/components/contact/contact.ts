import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Lazem lel formulaire

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactComponent {

  // Données de contact
  contactInfo = {
    whatsapp: '+21694760335', // ⚠️ Baddel noumrouk houni (avec 216)
    instagram: 'https://www.instagram.com/milsaparfums', // ⚠️ Baddel lien mta3ek
  };

  // Model lel Formulaire
  formData = {
    name: '',
    phone: '',
    message: ''
  };

  // Fonction bch t7ell WhatsApp direct
  openWhatsApp(): void {
    const url = `https://wa.me/${this.contactInfo.whatsapp}`;
    window.open(url, '_blank');
  }

  // Fonction bch t7ell Instagram
  openInstagram(): void {
    window.open(this.contactInfo.instagram, '_blank');
  }

  // Submit Formulaire (Juste alert tawa)
  sendMessage(): void {
    if (this.formData.name && this.formData.phone) {
      alert('Merci ! Votre message a été envoyé. Nous vous contacterons bientôt.');
      // Houni tnajjem tzid code bch tab3ath mail walla tconnecti b backend
      this.formData = { name: '', phone: '', message: '' }; // Reset
    } else {
      alert('Veuillez remplir votre nom et téléphone.');
    }
  }
}
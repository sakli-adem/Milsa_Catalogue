import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser'; // Import EmailJS

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactComponent {

  contactInfo = {
    whatsapp: '+21694760335',
    instagram: 'https://www.instagram.com/milsaparfums',
  };

  formData = {
    name: '',
    phone: '',
    message: ''
  };

  // Variable bch nwarriw loading wa9t l'envoi
  isLoading = false;

  openWhatsApp(): void {
    const url = `https://wa.me/${this.contactInfo.whatsapp}`;
    window.open(url, '_blank');
  }

  openInstagram(): void {
    window.open(this.contactInfo.instagram, '_blank');
  }

  // --- FONCTION D'ENVOI (INTEGRATION REELLE) ---
  async sendMessage() {
    // 1. Verification
    if (!this.formData.name || !this.formData.phone) {
      alert('Veuillez remplir votre nom et téléphone.');
      return;
    }

    this.isLoading = true; // Nabdeaw loading

    // 2. Paramètres (Hethom lazem tjibhom mel site EmailJS)
    const serviceID = 'service_wrkxg3y'; // ⚠️ REMPLACE HETHI (Service ID)
    const templateID = 'template_47lq6lw'; // ⚠️ REMPLACE HETHI (Template ID)
    const publicKey = '8yrJktKuiZIDLTERv';    // ⚠️ REMPLACE HETHI (Public Key)

    // 3. Liaison avec ton Template
    const templateParams = {
      from_name: this.formData.name,      // Yemchi l {{from_name}} fil template
      phone_number: this.formData.phone,  // Yemchi l {{phone_number}} fil template
      message: this.formData.message      // Yemchi l {{message}} fil template
    };

    try {
      // 4. Envoi
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      
      // Succès
      alert('✅ Merci ! Votre message a été envoyé. Nous vous contacterons bientôt.');
      this.formData = { name: '', phone: '', message: '' }; // Reset form

    } catch (error) {
      // Erreur
      console.error('FAILED...', error);
      alert('❌ Une erreur est survenue. Veuillez vérifier votre connexion.');
    } finally {
      this.isLoading = false; // Nwa9fou loading
    }
  }
}
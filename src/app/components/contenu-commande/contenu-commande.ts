import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

interface OrderItem {
  id: number;
  title: string;
  type: string;
  image: string; 
  description: string;
}

@Component({
  selector: 'app-contenu-commande',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './contenu-commande.html', 
  styleUrls: ['./contenu-commande.scss']
})
export class ContenuCommande { 

  items: OrderItem[] = [
    {
      id: 1,
      type: 'Bonus',
      title: 'Deux échantillons au choix',
      image: 'images/commande/echantillon.webp', 
      description: 'Chaque commande que vous passez chez nous est accompagnée de deux échantillons de haute qualité selon votre choix. Ce sont des parfums puissants et concentrés pour vous faire découvrir nos autres univers.'
    },
    {
      id: 2,
      type: 'Essentiel',
      title: 'Votre Commande',
      image: 'images/commande/commande.webp', 
      description: 'Ici vous trouverez les bases de parfums que vous avez sélectionnées. Nous préparons votre commande avec le plus grand soin pour garantir qu\'elle arrive en parfait état.'
    },
    {
      id: 3,
      type: 'Fidélité',
      title: 'Carte de Fidélité',
      image: 'images/commande/card.webp',
      description: 'Nous comptabilisons vos achats dès le début ! À la 3ème commande, vous bénéficiez de -20%. À la 6ème commande, vous recevez un parfum GRATUIT (au choix, basé sur le prix moyen de vos anciennes commandes).'
    },
    {
      id: 4,
      type: 'Occasion',
      title: 'Cadeau Spécial',
      image: 'images/commande/cadeaux.webp', 
      description: 'Ce n\'est pas systématique, mais lors des grandes occasions (fêtes, événements), nous ajoutons un petit cadeau surprise dans votre colis, adapté à la taille de votre commande.'
    }
  ];

  selectedItem: OrderItem | null = null;

  openDetails(item: OrderItem): void {
    this.selectedItem = item;
    document.body.style.overflow = 'hidden';
  }

  closeDetails(): void {
    this.selectedItem = null;
    document.body.style.overflow = 'auto';
  }
}
import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-apropos-parfums',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './apropos-parfums.html',
  styleUrls: ['./apropos-parfums.scss']
})
export class AproposParfumsComponent {

  // Données mta3 Chogan
  partner = {
    name: 'Chogan Group',
    logo: 'images/commande/chogan.png', // ⚠️ 7ott logo chogan houni
    description: 'Nous sommes fiers d\'être distributeurs officiels de Chogan Group. Nos essences proviennent des mêmes fournisseurs que les grandes marques, garantissant une qualité olfactive identique, sans le prix du marketing.'
  };

  // Données mta3 Tableau Comparatif
  comparisons = [
    { type: 'Eau de Toilette', concentration: '5 - 15%', tenue: '2 - 3 Heures', intensity: 'Faible' },
    { type: 'Eau de Parfum', concentration: '15 - 20%', tenue: '4 - 6 Heures', intensity: 'Moyenne' },
    { type: 'Extrait de Parfum', concentration: '30% +', tenue: '12 Heures +', intensity: 'Intense' }
  ];

  features = [
    {
      id: 1,
      title: 'Composition Bio & Vegan',
      icon: '🌿', 
      description: 'Nos parfums sont formulés avec de l\'alcool d\'origine végétale (blé). Certifiés Vegan, sans paraben, sans métaux lourds et non testés sur les animaux.'
    },
    {
      id: 2,
      title: 'Respect de la Peau',
      icon: '✨',
      description: 'Hypoallergéniques et doux, nos produits respectent le pH de votre peau. Aucune irritation, juste le plaisir du parfum pur, sans produits chimiques agressifs.'
    },
    {
      id: 3,
      title: 'Qualité Chogan',
      icon: '💎',
      description: 'La garantie d\'un produit italien d\'excellence. Une concentration maximale (Extrait) pour un sillage qui ne passe pas inaperçu.'
    }
  ];
}
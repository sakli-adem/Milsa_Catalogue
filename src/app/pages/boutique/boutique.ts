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
  
  // Injection des services
  private parfumService = inject(ParfumService);
  private cartService = inject(CartService);
  
  // --- VARIABLES DE DONNÉES ---
  categoryList: Parfum[] = []; // Liste pour l'onglet actif (ex: juste Femmes)
  globalList: Parfum[] = [];   // Stock complet pour la recherche (Femmes + Hommes + Luxe)
  parfums: Parfum[] = [];      // Liste affichée à l'écran (celle qu'on filtre)
  
  // État de l'interface
  activeCategory: 'femmes' | 'hommes' | 'luxe' = 'femmes';
  isLoading = false;
  selectedProduct: Parfum | null = null; // Pour le Modal
  
  // Terme de recherche actuel
  currentSearchTerm = ''; 

  ngOnInit() {
    // 1. Charger la catégorie par défaut (Femmes)
    this.chargerParfums('femmes');

    // 2. Charger le STOCK GLOBAL en arrière-plan (pour la recherche)
    this.parfumService.getAllParfumsCombined().subscribe(data => {
      this.globalList = data;
    });

    // 3. Écouter la barre de recherche (Navbar)
    this.parfumService.search$.subscribe(term => {
      this.currentSearchTerm = term;
      this.applyFilter(); // Appliquer le filtre à chaque lettre tapée
    });
  }

  // Fonction appelée quand on clique sur les boutons (Femmes, Hommes, Luxe)
  chargerParfums(categorie: 'femmes' | 'hommes' | 'luxe') {
    // On vide la recherche car l'utilisateur a cliqué manuellement sur une catégorie
    this.parfumService.updateSearchTerm(''); 
    
    this.loadCategory(categorie);
  }

  // Helper pour charger les données d'une catégorie spécifique
  loadCategory(cat: 'femmes' | 'hommes' | 'luxe') {
    this.activeCategory = cat;
    this.isLoading = true;
    
    // On vide l'affichage pour montrer le chargement
    this.parfums = [];

    this.parfumService.getParfums(cat).subscribe({
      next: (data) => {
        this.categoryList = data; // On garde les données de la catégorie en mémoire
        this.applyFilter();       // On affiche
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur chargement', err);
        this.isLoading = false;
      }
    });
  }

  // 🔥 FONCTION INTELLIGENTE DE FILTRAGE
  applyFilter() {
    // CAS 1: Il y a une recherche active
    if (this.currentSearchTerm && this.currentSearchTerm.trim() !== '') {
      const term = this.currentSearchTerm.toLowerCase();
      
      // On cherche dans le GLOBAL LIST (Tout le stock)
      this.parfums = this.globalList.filter(p => 
        p.nom.toLowerCase().includes(term) || 
        p.code.toLowerCase().includes(term)
      );

      // ✨ MAGIE: Changement automatique de l'onglet ✨
      if (this.parfums.length > 0) {
        const firstMatch = this.parfums[0]; // On regarde le premier produit trouvé
        
        // On change activeCategory selon le type du produit trouvé
        if (firstMatch.categorie === 'Homme') {
          this.activeCategory = 'hommes';
        } else if (firstMatch.categorie === 'Femme') {
          this.activeCategory = 'femmes';
        } else if (firstMatch.categorie === 'Unisex') {
          this.activeCategory = 'luxe';
        }
      }

    } else {
      // CAS 2: Pas de recherche (Mode navigation normal)
      // On affiche simplement la liste de la catégorie active
      this.parfums = [...this.categoryList];
    }
  }

  // --- LOGIQUE DU MODAL ---
  openModal(product: Parfum) {
    this.selectedProduct = product;
    document.body.style.overflow = 'hidden'; // Bloquer le scroll
  }

  closeModal() {
    this.selectedProduct = null;
    document.body.style.overflow = 'auto'; // Débloquer le scroll
  }

  // --- LOGIQUE AJOUT PANIER ---
  handleAddToCart(event: any) {
    this.cartService.addToCart({
      product: event.product,
      variant: event.variant,
      quantity: event.quantity
    });
    this.closeModal(); // Fermer le modal après ajout
  }
}
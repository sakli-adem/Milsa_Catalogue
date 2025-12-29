import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { BoutiqueComponent } from './pages/boutique/boutique';
// Import Jdid
import { PanierComponent } from './pages/panier/panier';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'boutique', component: BoutiqueComponent },
  { path: 'apropos', component: HomeComponent },
  { path: 'contact', component: HomeComponent },
  // Route Panier
  { path: 'panier', component: PanierComponent },

  { path: '**', redirectTo: '' }
];
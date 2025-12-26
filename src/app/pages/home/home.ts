import { Component } from '@angular/core';
// Importa les composants sghar (Vérifi ken dossieret 'components' mawjoudin fi src/app/components)
import { CatalogueComponent } from '../../components/catalogue/catalogue'; 
import { ContenuCommande } from '../../components/contenu-commande/contenu-commande';
import { AproposParfumsComponent } from '../../components/apropos-parfums/apropos-parfums';
import { ContactComponent } from '../../components/contact/contact';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CatalogueComponent, ContenuCommande, AproposParfumsComponent, ContactComponent],
  templateUrl: './home.html', // <--- Rod belek: esm l fichier html
  styleUrls: ['./home.scss']   // <--- Rod belek: esm l fichier scss
})
export class HomeComponent {}
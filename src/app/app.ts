import { Component } from '@angular/core';
// ⚠️ Import jdid: components/catalogue/...
import { CatalogueComponent } from './components/catalogue/catalogue'; 
import { ContenuCommande } from './components/contenu-commande/contenu-commande';
import { AproposParfumsComponent } from './components/apropos-parfums/apropos-parfums';
import { ContactComponent } from './components/contact/contact';
import { NavbarComponent } from './components/navbar/navbar';
@Component({
  selector: 'app-root',
  standalone: true,
imports: [CatalogueComponent, ContenuCommande, AproposParfumsComponent, ContactComponent, NavbarComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
}
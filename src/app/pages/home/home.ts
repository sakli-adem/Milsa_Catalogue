import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
// Importa les composants sghar (Vérifi ken dossieret 'components' mawjoudin fi src/app/components)
import { CatalogueComponent } from '../../components/catalogue/catalogue'; 
import { ContenuCommande } from '../../components/contenu-commande/contenu-commande';
import { AproposParfumsComponent } from '../../components/apropos-parfums/apropos-parfums';
import { ContactComponent } from '../../components/contact/contact';

import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CatalogueComponent, ContenuCommande, AproposParfumsComponent, ContactComponent],
  templateUrl: './home.html', // <--- Rod belek: esm l fichier html
  styleUrls: ['./home.scss']   // <--- Rod belek: esm l fichier scss
})
export class HomeComponent implements OnInit, AfterViewInit {

  private router = inject(Router);

  ngOnInit() {
    // Hetha bech ki tenzel 3al lien wenti deja fi nafs page
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkScroll();
      }
    });
  }

  ngAfterViewInit() {
    // Hetha bech ki ta3mel Refresh lel page
    // Na3mlou timeout sghir bech ntamnou elli html tcharger
    setTimeout(() => {
      this.checkScroll();
    }, 100);
  }

private checkScroll() {
    const url = this.router.url;

    if (url.includes('/apropos')) {
      this.scrollTo('apropos');
    } else if (url.includes('/contact')) {
      this.scrollTo('contact');
    } 
    // 3. 🔥 ZID EL CONDITION HETHI
    else if (url.includes('/contenu-commande')) {
      this.scrollTo('contenu-commande');
    } 
    else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Fonction Scroll (kima li kanet 3andek ama optimisée)
  private scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}
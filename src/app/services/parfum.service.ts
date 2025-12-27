import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Parfum } from '../models/parfum.model';

@Injectable({
  providedIn: 'root'
})
export class ParfumService {
  
  private http = inject(HttpClient);

  // 1. Pour la Recherche (Texte)
  private searchSubject = new BehaviorSubject<string>('');
  search$ = this.searchSubject.asObservable();

  // 🔥 2. NOUVEAU: Pour ouvrir le Modal depuis la Navbar
  private productOpenSubject = new BehaviorSubject<Parfum | null>(null);
  productOpen$ = this.productOpenSubject.asObservable();

  constructor() {}

  // Récupérer une seule catégorie
  getParfums(categorie: string): Observable<Parfum[]> {
    return this.http.get<Parfum[]>(`data/${categorie}/parfums.json`);
  }

  // Récupérer TOUT le stock (Femmes + Hommes + Luxe)
  getAllParfumsCombined(): Observable<Parfum[]> {
    return forkJoin([
      this.http.get<Parfum[]>('data/femmes/parfums.json'),
      this.http.get<Parfum[]>('data/hommes/parfums.json'),
      this.http.get<Parfum[]>('data/luxe/parfums.json')
    ]).pipe(
      map(([femmes, hommes, luxe]) => [...femmes, ...hommes, ...luxe])
    );
  }

  // Mettre à jour le texte de recherche
  updateSearchTerm(term: string) {
    this.searchSubject.next(term);
  }

  // 🔥 Declencher l'ouverture du modal
  triggerOpenModal(product: Parfum) {
    this.productOpenSubject.next(product);
  }

  // Reset (pour ne pas réouvrir le modal si on rafraichit)
  clearOpenModal() {
    this.productOpenSubject.next(null);
  }
}
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parfum } from '../models/parfum.model';

@Injectable({
  providedIn: 'root'
})
export class ParfumService {
  
  private http = inject(HttpClient);

  // Fonction bech tjib les parfums selon la catégorie (femmes, hommes, luxe)
  getParfums(categorie: 'femmes' | 'hommes' | 'luxe'): Observable<Parfum[]> {
    // Houni l path dynamique: public/data/femmes/parfums.json
    return this.http.get<Parfum[]>(`data/${categorie}/parfums.json`);
  }
}
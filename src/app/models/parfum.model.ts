export interface Composition {
  tete: string;  // Note de tête (awel ma tchim)
  coeur: string; // Note de cœur (ba3d chwaya)
  fond: string;  // Note de fond (elli to93od)
}

export interface Variante {
  volume: string;
  prix: number;
}

export interface Parfum {
  code: string;
  nom: string;
  categorie: string;
  description: string;
  image: string;
  nouveau: boolean;
  // Zidna hethi:
  composition: Composition; 
  variantes: Variante[];
}
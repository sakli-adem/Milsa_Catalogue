import { Parfum, Variante } from './parfum.model';

export interface CartItem {
  product: Parfum;
  variant: Variante;
  quantity: number;
}
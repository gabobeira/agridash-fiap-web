import { Stock } from './Stock';

export interface StockRepository {
  getStockProducts(): Promise<Stock[]>;
}

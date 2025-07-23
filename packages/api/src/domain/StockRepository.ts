import { Stock } from './Stock';

export interface StockRepository {
  createStock(stock: Stock): Promise<Stock>;
  getStocks(): Promise<Stock[]>;
}

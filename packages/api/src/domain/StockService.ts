import { Stock } from './Stock';

export interface StockService {
  createStock(stock: Stock): Promise<Stock>;
  getStocks(): Promise<Stock[]>;
}

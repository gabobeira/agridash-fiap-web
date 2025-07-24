import { Sale } from './Sale';

export interface SaleRepository {
  getSales({
    startDate,
    endDate,
    productId,
    cooperativeId,
  }: {
    startDate?: Date;
    endDate?: Date;
    productId?: string;
    cooperativeId?: string;
  }): Promise<Sale[]>;
}

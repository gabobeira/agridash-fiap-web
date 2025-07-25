import { DocumentSnapshot } from 'firebase/firestore';
import { Sale } from './Sale';

export interface SaleRepository {
  getSalesPaginated({
    startDate,
    endDate,
    pageSize,
    lastDoc,
    includeCount,
  }: {
    startDate?: Date;
    endDate?: Date;
    pageSize?: number;
    lastDoc?: DocumentSnapshot;
    includeCount?: boolean;
  }): Promise<{
    sales: Sale[];
    lastDoc?: DocumentSnapshot;
    hasMore?: boolean;
    currentPage?: number;
    totalPages?: number;
    totalCount?: number;
  }>;

  getSales({
    startDate,
    endDate,
  }: {
    startDate?: Date;
    endDate?: Date;
  }): Promise<Sale[]>;
}

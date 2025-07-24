import { DocumentSnapshot } from 'firebase/firestore';
import { Sale } from './Sale';

export interface SaleRepository {
  getSales({
    startDate,
    endDate,
    productId,
    cooperativeId,
    pageSize,
    lastDoc,
    includeCount,
  }: {
    startDate?: Date;
    endDate?: Date;
    productId?: string;
    cooperativeId?: string;
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
}

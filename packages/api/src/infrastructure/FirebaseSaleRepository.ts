import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import {
  collection,
  DocumentSnapshot,
  getCountFromServer,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { Sale } from '../domain/Sale';
import { SaleRepository } from '../domain/SaleRepository';

export class FirebaseSaleRepository implements SaleRepository {
  private readonly db;
  private readonly collectionRef;

  constructor(firebaseConfig: object) {
    let app: FirebaseApp;
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
    this.db = getFirestore(app);
    this.collectionRef = collection(this.db, 'vendas');
  }

  async getSalesPaginated({
    startDate,
    endDate,
    productId,
    cooperativeId,
    pageSize = 10,
    page = 1,
    lastDoc,
    includeCount = true,
  }: {
    startDate?: Date;
    endDate?: Date;
    productId?: string;
    cooperativeId?: string;
    pageSize?: number;
    page?: number;
    lastDoc?: DocumentSnapshot;
    includeCount?: boolean;
  }): Promise<{
    sales: Sale[];
    lastDoc?: DocumentSnapshot;
    hasMore?: boolean;
    currentPage?: number;
    totalPages?: number;
    totalCount?: number;
  }> {
    const constraints = [];

    if (startDate) constraints.push(where('data', '>=', startDate));
    if (endDate) constraints.push(where('data', '<=', endDate));
    if (productId) constraints.push(where('produto', '==', productId));
    if (cooperativeId)
      constraints.push(where('cooperado', '==', cooperativeId));

    let totalCount: number | undefined;
    let totalPages: number | undefined;

    if (includeCount) {
      const countQuery = query(this.collectionRef, ...constraints);
      const countSnapshot = await getCountFromServer(countQuery);
      totalCount = countSnapshot.data().count;
      totalPages = Math.ceil(totalCount / pageSize);
    }

    let queryRef = query(
      this.collectionRef,
      ...constraints,
      orderBy('data', 'desc'),
      limit(pageSize + 1)
    );

    if (lastDoc) {
      queryRef = query(queryRef, startAfter(lastDoc));
    } else if (page > 1) {
      const skipCount = (page - 1) * pageSize;
      const skipQuery = query(
        this.collectionRef,
        ...constraints,
        orderBy('data', 'desc'),
        limit(skipCount)
      );

      const skipSnapshot = await getDocs(skipQuery);
      const lastSkipDoc = skipSnapshot.docs[skipSnapshot.docs.length - 1];

      if (lastSkipDoc) {
        queryRef = query(queryRef, startAfter(lastSkipDoc));
      }
    }

    const snapshot = await getDocs(queryRef);
    const docs = snapshot.docs;

    const hasMore = docs.length > pageSize;

    const sales = docs.slice(0, pageSize).map(doc => {
      const data = doc.data();
      return new Sale({
        cooperado: data.cooperado,
        data: data.data?.toDate?.() || new Date(),
        produto: data.produto,
        quantidadeProduto: data.quantidade,
        valorVenda: data.valor,
      });
    });

    return {
      sales,
      lastDoc: docs[pageSize - 1] || undefined,
      hasMore,
      currentPage: page,
      totalPages,
      totalCount,
    };
  }

  async getSales({
    startDate,
    endDate,
  }: {
    startDate?: Date;
    endDate?: Date;
  }): Promise<Sale[]> {
    const constraints = [];

    if (startDate) constraints.push(where('data', '>=', startDate));
    if (endDate) constraints.push(where('data', '<=', endDate));

    const queryRef = query(
      this.collectionRef,
      ...constraints,
      orderBy('data', 'desc')
    );

    const snapshot = await getDocs(queryRef);

    return snapshot.docs.map(doc => {
      const data = doc.data();
      return new Sale({
        cooperado: data.cooperado,
        data: data.data?.toDate?.() || new Date(),
        produto: data.produto,
        quantidadeProduto: data.quantidade,
        valorVenda: data.valor,
      });
    });
  }
}

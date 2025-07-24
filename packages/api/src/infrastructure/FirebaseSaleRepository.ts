import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
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

  async getSales({
    startDate,
    endDate,
    productId,
    cooperativeId,
  }: {
    startDate?: Date;
    endDate?: Date;
    productId?: string;
    cooperativeId?: string;
  }): Promise<Sale[]> {
    const constraints = [];

    if (startDate) constraints.push(where('data', '>=', startDate));
    if (endDate) constraints.push(where('data', '<=', endDate));
    if (productId) constraints.push(where('produto', '==', productId));
    if (cooperativeId)
      constraints.push(where('cooperado', '==', cooperativeId));

    const snapshot = await getDocs(
      query(this.collectionRef, ...constraints, orderBy('data', 'desc'))
    );

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

import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';
import { Stock } from '../domain/Stock';
import { StockRepository } from '../domain/StockRepository';

export class FirebaseStockRepository implements StockRepository {
  private db;

  constructor(firebaseConfig: object) {
    let app: FirebaseApp;
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
    this.db = getFirestore(app);
  }

  async createStock(stock: Stock): Promise<Stock> {
    await addDoc(collection(this.db, 'estoque'), {
      ...stock,
    });
    return stock;
  }

  async getStocks(): Promise<Stock[]> {
    const snapshot = await getDocs(collection(this.db, 'estoque'));
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
      } as Stock;
    });
  }
}

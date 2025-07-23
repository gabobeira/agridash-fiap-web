import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';
import { Transaction } from '../domain/Transaction';
import { TransactionRepository } from '../domain/TransactionRepository';

export class FirebaseTransactionRepository implements TransactionRepository {
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

  async createTransaction(transaction: Transaction): Promise<Transaction> {
    await addDoc(collection(this.db, 'vendas'), {
      ...transaction,
      data:
        transaction.data instanceof Date
          ? transaction.data.toISOString()
          : transaction.data,
    });
    return transaction;
  }

  async getTransactions(): Promise<Transaction[]> {
    const snapshot = await getDocs(collection(this.db, 'vendas'));
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        data: data.data ? new Date(data.data) : undefined,
      } as Transaction;
    });
  }
}

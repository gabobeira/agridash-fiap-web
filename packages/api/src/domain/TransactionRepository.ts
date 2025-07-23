import { Transaction } from './Transaction';

export interface TransactionRepository {
  createTransaction(transaction: Transaction): Promise<Transaction>;
  getTransactions(): Promise<Transaction[]>;
}

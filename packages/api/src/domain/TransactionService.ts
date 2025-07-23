import { Transaction } from './Transaction';

export interface TransactionService {
  createTransaction(transaction: Transaction): Promise<Transaction>;
  getTransactions(): Promise<Transaction[]>;
}

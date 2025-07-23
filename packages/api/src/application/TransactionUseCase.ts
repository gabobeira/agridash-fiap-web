import { Transaction } from '../domain/Transaction';
import { TransactionService } from '../domain/TransactionService';

export class TransactionUseCase {
  constructor(private transactionService: TransactionService) {}

  async createTransaction(transaction: Transaction): Promise<Transaction> {
    return this.transactionService.createTransaction(transaction);
  }

  async getTransactions(): Promise<Transaction[]> {
    return this.transactionService.getTransactions();
  }
}

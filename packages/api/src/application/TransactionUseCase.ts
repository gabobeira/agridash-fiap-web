import { Transaction } from '../domain/Transaction';
import { TransactionRepository } from '../domain/TransactionRepository';

export class TransactionUseCase {
  constructor(private transactionRepository: TransactionRepository) {}

  async createTransaction(transaction: Transaction): Promise<Transaction> {
    return this.transactionRepository.createTransaction(transaction);
  }

  async getTransactions(): Promise<Transaction[]> {
    return this.transactionRepository.getTransactions();
  }
}

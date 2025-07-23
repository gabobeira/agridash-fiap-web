import { useCallback, useState } from 'react';
import { Transaction } from '../../../../packages/api/src/domain/Transaction';
import { transactionService } from './transactionService';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await transactionService.getTransactions();
      setTransactions(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTransaction = useCallback(
    async (transaction: Transaction) => {
      setLoading(true);
      setError(null);
      try {
        await transactionService.createTransaction(transaction);
        await fetchTransactions();
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    [fetchTransactions]
  );

  return { transactions, loading, error, fetchTransactions, createTransaction };
}

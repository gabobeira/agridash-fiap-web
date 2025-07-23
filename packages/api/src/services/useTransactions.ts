import { notifications } from '@mantine/notifications';
import { useCallback, useState } from 'react';
import { Transaction } from '../domain/Transaction';
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
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      setError(err as Error);
      notifications.show({
        title: 'Erro ao carregar transações',
        message: errorMessage,
        color: 'red',
      });
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
        const errorMessage =
          err instanceof Error ? err.message : 'Erro desconhecido';
        setError(err as Error);
        notifications.show({
          title: 'Erro ao cadastrar transação',
          message: errorMessage,
          color: 'red',
        });
      } finally {
        setLoading(false);
      }
    },
    [fetchTransactions]
  );

  return { transactions, loading, error, fetchTransactions, createTransaction };
}

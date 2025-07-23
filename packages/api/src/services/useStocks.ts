import { notifications } from '@mantine/notifications';
import { useCallback, useState } from 'react';
import { Stock } from '../domain/Stock';
import { stockService } from './stockService';

export function useStocks() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchStocks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await stockService.getStocks();
      setStocks(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      setError(err as Error);
      notifications.show({
        title: 'Erro ao carregar produtos',
        message: errorMessage,
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const createStock = useCallback(
    async (stock: Stock) => {
      setLoading(true);
      setError(null);
      try {
        await stockService.createStock(stock);
        await fetchStocks();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erro desconhecido';
        setError(err as Error);
        notifications.show({
          title: 'Erro ao cadastrar produto',
          message: errorMessage,
          color: 'red',
        });
      } finally {
        setLoading(false);
      }
    },
    [fetchStocks]
  );

  return { stocks, loading, error, fetchStocks, createStock };
}

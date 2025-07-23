import { useCallback, useState } from 'react';
import { Stock } from '../../../../packages/api/src/domain/Stock';
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
      setError(err as Error);
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
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    [fetchStocks]
  );

  return { stocks, loading, error, fetchStocks, createStock };
}

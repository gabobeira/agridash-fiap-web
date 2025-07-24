'use client';

import { notifications } from '@mantine/notifications';
import { useCallback, useState } from 'react';
import {
  GetStockTableDataUseCase,
  StockData,
} from '../application/GetStockTableDataUseCase';
import { firebaseConfig } from '../configuration/firebase';
import { FirebaseStockRepository } from '../infrastructure/FirebaseStockRepository';

export function useStockService() {
  const [stockProductsData, setStockProductsData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getStockProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const stockRepository = new FirebaseStockRepository(firebaseConfig);
      const getStockTableDataUseCase = new GetStockTableDataUseCase(
        stockRepository
      );
      const data = await getStockTableDataUseCase.execute();
      setStockProductsData(data.stockData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      setError(err as Error);
      notifications.show({
        title: 'Erro ao carregar produtos em estoque',
        message: errorMessage,
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return { stockProductsData, loading, error, getStockProducts };
}

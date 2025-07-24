'use client';

import { notifications } from '@mantine/notifications';
import { useCallback, useState } from 'react';
import {
  GetSalesTableDataRequest,
  GetSalesTableDataUseCase,
  SaleData,
} from '../application/GetSalesTableDataUseCase';
import { firebaseConfig } from '../configuration/firebase';
import { FirebaseSaleRepository } from '../infrastructure/FirebaseSaleRepository';
import { FirebaseStockRepository } from '../infrastructure/FirebaseStockRepository';

export function useSalesService() {
  const [salesData, setSalesData] = useState<SaleData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getSalesData = useCallback(
    async (requestParams: GetSalesTableDataRequest) => {
      setLoading(true);
      setError(null);
      try {
        const saleRepository = new FirebaseSaleRepository(firebaseConfig);
        const stockRepository = new FirebaseStockRepository(firebaseConfig);
        const getSalesTableDataUseCase = new GetSalesTableDataUseCase(
          saleRepository,
          stockRepository
        );
        const data = await getSalesTableDataUseCase.execute(requestParams);
        setSalesData(data.salesData);
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
    },
    []
  );

  return { salesData, loading, error, getSalesData };
}

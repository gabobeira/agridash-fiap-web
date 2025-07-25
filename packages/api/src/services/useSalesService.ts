'use client';

import { notifications } from '@mantine/notifications';
import { useCallback, useState } from 'react';
import {
  CooperativeProductMix,
  GetCooperativeProductMixUseCase,
} from '../application/GetCooperativeProductMixUseCase';
import {
  CooperativeProfitByDay,
  GetCooperativeProfitByDayUseCase,
} from '../application/GetCooperativeProfitByDayUseCase';
import {
  FinancialIndicators,
  GetFinancialIndicatorsUseCase,
} from '../application/GetFinancialIndicatorsUseCase';
import {
  GetProductPerformanceTrendsUseCase,
  ProductPerformanceTrend,
} from '../application/GetProductPerformanceTrendsUseCase';
import {
  GetProductVolumeVsProfitMarginUseCase,
  ProductVolumeVsProfitMargin,
} from '../application/GetProductVolumeVsProfitMarginUseCase';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState<number | undefined>();
  const [totalCount, setTotalCount] = useState<number | undefined>();
  const [chartData, setChartData] = useState<{
    cooperativeProfitByDay: CooperativeProfitByDay[];
    productVolumeVsProfitMargin: ProductVolumeVsProfitMargin[];
    productPerformanceTrends: ProductPerformanceTrend[];
    cooperativeProductMix: CooperativeProductMix[];
  } | null>(null);
  const [financialIndicators, setFinancialIndicators] =
    useState<FinancialIndicators | null>(null);

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
        setCurrentPage(data.currentPage || 1);
        setHasMore(data.hasMore || false);
        if (data.totalPages) setTotalPages(data.totalPages);
        if (data.totalCount) setTotalCount(data.totalCount);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erro desconhecido';
        console.error('Error fetching sales data:', errorMessage);

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

  const getSalesChartData = useCallback(
    async (startDate?: Date, endDate?: Date) => {
      setLoading(true);
      setError(null);
      try {
        const saleRepository = new FirebaseSaleRepository(firebaseConfig);
        const stockRepository = new FirebaseStockRepository(firebaseConfig);
        const getCooperativeProfitByDayUseCase =
          new GetCooperativeProfitByDayUseCase(saleRepository, stockRepository);
        const getProductVolumeVsProfitMarginUseCase =
          new GetProductVolumeVsProfitMarginUseCase(
            saleRepository,
            stockRepository
          );
        const getProductPerformanceTrendsUseCase =
          new GetProductPerformanceTrendsUseCase(
            saleRepository,
            stockRepository
          );
        const getCooperativeProductMixUseCase =
          new GetCooperativeProductMixUseCase(saleRepository, stockRepository);

        const profitByDayResponse =
          await getCooperativeProfitByDayUseCase.execute({
            startDate:
              startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Default: últimos 30 dias
            endDate: endDate || new Date(),
          });
        const volumeVsProfitMarginResponse =
          await getProductVolumeVsProfitMarginUseCase.execute({
            startDate,
            endDate,
          });
        const productPerformanceTrendsResponse =
          await getProductPerformanceTrendsUseCase.execute({
            startDate,
            endDate,
          });
        const cooperativeProductMixResponse =
          await getCooperativeProductMixUseCase.execute({
            startDate,
            endDate,
          });

        setChartData({
          cooperativeProfitByDay: profitByDayResponse.profitByDay,
          productVolumeVsProfitMargin: volumeVsProfitMarginResponse.products,
          productPerformanceTrends: productPerformanceTrendsResponse.trends,
          cooperativeProductMix:
            cooperativeProductMixResponse.cooperativeProductMatrix,
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erro desconhecido';
        console.error(
          'Error fetching sales group by cooperative data:',
          errorMessage
        );

        setError(err as Error);
        notifications.show({
          title: 'Erro ao carregar dados',
          message: errorMessage,
          color: 'red',
        });
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getFinancialIndicators = useCallback(
    async (startDate?: Date, endDate?: Date) => {
      setLoading(true);
      setError(null);
      try {
        const saleRepository = new FirebaseSaleRepository(firebaseConfig);
        const stockRepository = new FirebaseStockRepository(firebaseConfig);
        const getFinancialIndicatorsUseCase = new GetFinancialIndicatorsUseCase(
          saleRepository,
          stockRepository
        );

        const response = await getFinancialIndicatorsUseCase.execute({
          startDate,
          endDate,
        });

        setFinancialIndicators(response.indicators);
        return response.indicators;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erro desconhecido';
        console.error('Error fetching financial indicators:', errorMessage);

        setError(err as Error);
        notifications.show({
          title: 'Erro ao carregar indicadores financeiros',
          message: errorMessage,
          color: 'red',
        });
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    salesData,
    getSalesData,
    chartData,
    getSalesChartData,
    financialIndicators,
    getFinancialIndicators,
    loading,
    error,
    currentPage,
    hasMore,
    totalPages,
    totalCount,
  };
}

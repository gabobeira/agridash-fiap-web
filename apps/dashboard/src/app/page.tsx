'use client';

import { DashboardCharts } from '@/components/DashboardCharts';
import { DashboardIndicators } from '@/components/DashboardIndicators';
import { DashboardMain } from '@/components/DashboardMain';
import { DateFilters } from '@/components/DateFilters';
import { useSalesService } from '@agridash/api';
import { Grid } from '@mantine/core';
import { FLoadingOverlay } from '@repo/ui';
import { useEffect, useState } from 'react';

export default function HomeDashboard() {
  const {
    chartData,
    getSalesChartData,
    financialIndicators,
    getFinancialIndicators,
    loading,
  } = useSalesService();
  const {
    cooperativeProfitByDay,
    productVolumeVsProfitMargin,
    productPerformanceTrends,
    cooperativeProductMix,
  } = chartData || {};

  const [appliedFilters, setAppliedFilters] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    endDate: new Date(),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleApplyFilters = (filters: any) => {
    setAppliedFilters(filters);
  };

  useEffect(() => {
    getSalesChartData(appliedFilters.startDate, appliedFilters.endDate);
    getFinancialIndicators(appliedFilters.startDate, appliedFilters.endDate);
  }, [getSalesChartData, getFinancialIndicators, appliedFilters]);

  if (loading) {
    return <FLoadingOverlay />;
  }

  return (
    <DashboardMain
      title="Visão geral"
      subtitle="Análise de dados e indicadores financeiros da cooperativa agrícola"
    >
      <DateFilters
        applyFilters={handleApplyFilters}
        appliedFilters={appliedFilters}
      />
      <Grid justify="space-between" align="stretch" mb="xl">
        <DashboardIndicators financialIndicators={financialIndicators} />
        <DashboardCharts
          cooperativeProfitByDay={cooperativeProfitByDay}
          productVolumeVsProfitMargin={productVolumeVsProfitMargin}
          productPerformanceTrends={productPerformanceTrends}
          cooperativeProductMix={cooperativeProductMix}
        />
      </Grid>
    </DashboardMain>
  );
}

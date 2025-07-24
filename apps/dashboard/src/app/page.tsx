'use client';

import { DashboardMain } from '@/components/DashboardMain';
import { useSalesService } from '@agridash/api';
import { Grid, GridCol } from '@mantine/core';
import { FBarChart, FCard, FLoadingOverlay } from '@repo/ui';
import { useEffect } from 'react';

export default function HomeDashboard() {
  const { chartData, getSalesChartData, loading } = useSalesService();
  const { cooperativeGroups, productGroups } = chartData || {};

  useEffect(() => {
    getSalesChartData();
  }, [getSalesChartData]);

  if (loading) {
    return <FLoadingOverlay />;
  }

  return (
    <DashboardMain
      title="Visão geral"
      subtitle="Microfrontend independente com componentes compartilhados"
    >
      <Grid justify="space-between" align="stretch" mb="xl">
        <GridCol span={{ base: 12, md: 4 }}>
          <FCard
            title="Indicador 1"
            subtitle="Visualização das vendas de produtos por cooperado ao longo do tempo."
          ></FCard>
        </GridCol>

        <GridCol span={{ base: 12, md: 4 }}>
          <FCard
            title="Indicador 3"
            subtitle="Visualização das vendas de produtos por cooperado ao longo do tempo."
          ></FCard>
        </GridCol>

        <GridCol span={{ base: 12, md: 4 }}>
          <FCard
            title="Indicador 3"
            subtitle="Visualização das vendas de produtos por cooperado ao longo do tempo."
          ></FCard>
        </GridCol>

        <GridCol span={{ base: 12, md: 6 }}>
          <FCard
            title="Total de Vendas por Cooperado"
            subtitle="Visualização do valor total de vendas por cooperado."
          >
            {cooperativeGroups && cooperativeGroups.length > 0 ? (
              <FBarChart
                data={cooperativeGroups}
                series={[
                  {
                    name: 'totalVendas',
                    label: 'Faturamento no período',
                    color: 'green',
                  },
                ]}
                dataKey="cooperado"
              />
            ) : null}
          </FCard>
        </GridCol>

        <GridCol span={{ base: 12, md: 6 }}>
          <FCard
            title="Quantidade Vendida por Produto"
            subtitle="Visualização da quantidade total vendida por produto."
          >
            {productGroups && productGroups.length > 0 ? (
              <FBarChart
                data={productGroups}
                series={[
                  {
                    name: 'quantidadeTotalVendida',
                    label: 'Quantidade',
                    color: 'blue',
                  },
                ]}
                dataKey="produto"
              />
            ) : null}
          </FCard>
        </GridCol>
      </Grid>
    </DashboardMain>
  );
}

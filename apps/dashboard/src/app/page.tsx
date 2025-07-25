'use client';

import { DashboardMain } from '@/components/DashboardMain';
import { SalesFilters } from '@/components/SalesFilters';
import { useSalesService } from '@agridash/api';
import { BarChart, LineChart } from '@mantine/charts';
import { Grid, GridCol, Text } from '@mantine/core';
import { FAreaChart, FCard, FLoadingOverlay, FScatterChart } from '@repo/ui';
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  const transformProfitData = () => {
    if (!cooperativeProfitByDay || cooperativeProfitByDay.length === 0)
      return [];

    const cooperatives = Object.keys(
      cooperativeProfitByDay[0]?.cooperativeProfit || {}
    );

    return cooperativeProfitByDay.map(dayData => {
      const transformed: Record<string, string | number> = {
        date: dayData.date,
      };
      cooperatives.forEach(cooperative => {
        transformed[cooperative] = dayData.cooperativeProfit[cooperative] || 0;
      });
      return transformed;
    });
  };

  const generateProfitSeries = () => {
    if (!cooperativeProfitByDay || cooperativeProfitByDay.length === 0)
      return [];

    const cooperatives = Object.keys(
      cooperativeProfitByDay[0]?.cooperativeProfit || {}
    );
    const colors = [
      'green',
      'blue',
      'orange',
      'red',
      'purple',
      'yellow',
      'cyan',
    ];

    return cooperatives.map((cooperative, index) => ({
      name: cooperative,
      color: colors[index % colors.length],
    }));
  };

  const transformProductTrendsData = () => {
    if (!productPerformanceTrends || productPerformanceTrends.length === 0)
      return [];

    const dataByDate = productPerformanceTrends.reduce(
      (acc, trend) => {
        if (!acc[trend.date]) {
          acc[trend.date] = { date: trend.date };
        }
        acc[trend.date][trend.produto] = trend.receitaDiaria;
        return acc;
      },
      {} as Record<string, Record<string, string | number>>
    );

    return Object.values(dataByDate);
  };

  const generateProductTrendsSeries = () => {
    if (!productPerformanceTrends || productPerformanceTrends.length === 0)
      return [];

    const products = [...new Set(productPerformanceTrends.map(t => t.produto))];
    const colors = [
      'blue',
      'green',
      'orange',
      'red',
      'purple',
      'cyan',
      'yellow',
    ];

    return products.map((produto, index) => ({
      name: produto,
      color: colors[index % colors.length],
    }));
  };

  const transformCooperativeProductData = () => {
    if (!cooperativeProductMix || cooperativeProductMix.length === 0) return [];

    const sortedInteractions = cooperativeProductMix.toSorted(
      (a, b) => b.receitaGerada - a.receitaGerada
    );
    const topInteractions = sortedInteractions.slice(0, 10);

    return topInteractions.map(item => ({
      interaction: `${item.cooperado} - ${item.produto}`,
      receita: item.receitaGerada,
      lucro: item.lucroPorProduto,
      quantidade: item.quantidadeVendida,
    }));
  };

  if (loading) {
    return <FLoadingOverlay />;
  }

  return (
    <DashboardMain
      title="Visão geral"
      subtitle="Análise de dados e indicadores financeiros da cooperativa agrícola"
    >
      <SalesFilters
        applyFilters={handleApplyFilters}
        appliedFilters={appliedFilters}
      />
      <Grid justify="space-between" align="stretch" mb="xl">
        <GridCol span={{ base: 12, md: 3 }}>
          <FCard title="Receita Total" customProps={{ h: '100%' }}>
            <Text size="xl" fw="bold" c="#28a745">
              {financialIndicators
                ? formatCurrency(financialIndicators.receitaTotal)
                : 'Carregando...'}
            </Text>
            <Text size="xs" c="neutral.4" mb="sm">
              Valor total de vendas no período. Calculado como: Σ(Preço Unitário
              × Quantidade Vendida)
            </Text>
          </FCard>
        </GridCol>

        <GridCol span={{ base: 12, md: 3 }}>
          <FCard title="Despesa Total" customProps={{ h: '100%' }}>
            <Text size="xl" fw="bold" c="#dc3545">
              {financialIndicators
                ? formatCurrency(financialIndicators.despesaTotal)
                : 'Carregando...'}
            </Text>
            <Text size="xs" c="neutral.4" mb="sm">
              Custo total de produção no período. Calculado como: Σ(Custo
              Unitário × Quantidade Produzida)
            </Text>
          </FCard>
        </GridCol>

        <GridCol span={{ base: 12, md: 3 }}>
          <FCard title="Lucro Total" customProps={{ h: '100%' }}>
            <Text size="xl" fw="bold" c="#007bff">
              {financialIndicators
                ? formatCurrency(financialIndicators.lucroTotal)
                : 'Carregando...'}
            </Text>
            <Text size="xs" c="neutral.4" mb="sm">
              Lucro bruto do período. Calculado como: Receita Total - Despesa
              Total
            </Text>
          </FCard>
        </GridCol>

        <GridCol span={{ base: 12, md: 3 }}>
          <FCard title="Margem de Lucro" customProps={{ h: '100%' }}>
            <Text size="xl" fw="bold" c="#6f42c1">
              {financialIndicators
                ? formatPercentage(financialIndicators.margemLucroTotal)
                : 'Carregando...'}
            </Text>
            <Text size="xs" c="neutral.4" mb="sm">
              Percentual de lucro sobre as vendas. Calculado como: (Lucro Total
              ÷ Receita Total) × 100
            </Text>
          </FCard>
        </GridCol>

        <GridCol span={{ base: 12, md: 3 }}>
          <FCard title="Ticket Médio" customProps={{ h: '100%' }}>
            <Text size="xl" fw="bold" c="#fd7e14">
              {financialIndicators
                ? formatCurrency(financialIndicators.ticketMedio)
                : 'Carregando...'}
            </Text>
            <Text size="xs" c="neutral.4" mb="sm">
              Valor médio por transação. Calculado como: Receita Total ÷ Número
              de Transações
            </Text>
          </FCard>
        </GridCol>

        <GridCol span={{ base: 12, md: 3 }}>
          <FCard title="Produtos Vendidos" customProps={{ h: '100%' }}>
            <Text size="xl" fw="bold" c="#20c997">
              {financialIndicators
                ? formatNumber(financialIndicators.quantidadeTotalVendida)
                : 'Carregando...'}
            </Text>
            <Text size="xs" c="neutral.4" mb="sm">
              Quantidade total de produtos vendidos no período. Soma de todas as
              quantidades das transações.
            </Text>
          </FCard>
        </GridCol>

        <GridCol span={{ base: 12, md: 3 }}>
          <FCard title="Total de Transações" customProps={{ h: '100%' }}>
            <Text size="xl" fw="bold" c="#6c757d">
              {financialIndicators
                ? formatNumber(financialIndicators.totalTransacoes)
                : 'Carregando...'}
            </Text>
            <Text size="xs" c="neutral.4" mb="sm">
              Número total de vendas realizadas no período. Cada venda
              representa uma transação única.
            </Text>
          </FCard>
        </GridCol>

        <GridCol span={{ base: 12, md: 3 }}>
          <FCard title="Resumo Financeiro" customProps={{ h: '100%' }}>
            <div>
              <Text size="sm" lh={1.5}>
                <Text component="span" fw="bold">
                  Volume:
                </Text>{' '}
                {financialIndicators
                  ? formatNumber(financialIndicators.quantidadeTotalVendida)
                  : '0'}{' '}
                produtos
              </Text>
              <Text size="sm" lh={1.5}>
                <Text component="span" fw="bold">
                  Vendas:
                </Text>{' '}
                {financialIndicators
                  ? formatNumber(financialIndicators.totalTransacoes)
                  : '0'}{' '}
                transações
              </Text>
              <Text size="sm" lh={1.5}>
                <Text component="span" fw="bold">
                  Performance:
                </Text>{' '}
                {financialIndicators
                  ? formatPercentage(financialIndicators.margemLucroTotal)
                  : '0%'}{' '}
                margem
              </Text>
            </div>
            <Text size="xs" c="neutral.4" mb="sm">
              Visão consolidada do desempenho financeiro do período analisado.
            </Text>
          </FCard>
        </GridCol>

        <GridCol span={{ base: 12 }}>
          <FCard
            title="Top 10 Interações Cooperado x Produto"
            subtitle="Maiores receitas por combinação cooperado-produto."
            customProps={{ h: '100%' }}
          >
            {cooperativeProductMix && cooperativeProductMix.length > 0 ? (
              <BarChart
                h={300}
                data={transformCooperativeProductData()}
                dataKey="interaction"
                series={[
                  { name: 'receita', color: 'blue', label: 'Receita' },
                  { name: 'lucro', color: 'green', label: 'Lucro' },
                ]}
                tickLine="xy"
                withLegend
                legendProps={{ verticalAlign: 'top', height: 50 }}
                valueFormatter={(value: number) => formatCurrency(value)}
              />
            ) : (
              <Text ta="center" c="dimmed" mt="xl">
                Nenhum dado de matriz disponível
              </Text>
            )}
          </FCard>
        </GridCol>

        <GridCol span={{ base: 12 }}>
          <FCard
            title="Lucro por Cooperado ao Longo do Tempo"
            subtitle="Evolução diária do lucro de cada cooperado no período."
            customProps={{ h: '100%' }}
          >
            <FAreaChart
              data={transformProfitData()}
              series={generateProfitSeries()}
              dataKey="date"
            />
          </FCard>
        </GridCol>

        <GridCol span={{ base: 12, md: 6 }}>
          <FCard
            title="Volume de Venda vs. Margem de Lucro"
            subtitle="Classificação de produtos: Alto/Baixo Volume x Alta/Baixa Margem."
            customProps={{ h: '100%' }}
          >
            <FScatterChart
              data={
                productVolumeVsProfitMargin?.map(product => ({
                  x: product.volumeVenda,
                  y: product.margemLucro,
                  produto: product.produto,
                  categoria: product.categoria,
                })) || []
              }
              dataKey={{ x: 'x', y: 'y' }}
              xAxisKey="Volume de Venda (unidades)"
              yAxisKey="Margem de Lucro (%)"
            />
          </FCard>
        </GridCol>

        <GridCol span={{ base: 12, md: 6 }}>
          <FCard
            title="Performance de Produtos ao Longo do Tempo"
            subtitle="Evolução da receita diária por produto no período."
            customProps={{ h: '100%' }}
          >
            {productPerformanceTrends && productPerformanceTrends.length > 0 ? (
              <LineChart
                h={300}
                data={transformProductTrendsData()}
                dataKey="date"
                series={generateProductTrendsSeries()}
                curveType="linear"
                strokeWidth={2}
                withLegend
                legendProps={{ verticalAlign: 'top', height: 50 }}
              />
            ) : (
              <Text ta="center" c="dimmed" mt="xl">
                Nenhum dado de performance disponível
              </Text>
            )}
          </FCard>
        </GridCol>
      </Grid>
    </DashboardMain>
  );
}

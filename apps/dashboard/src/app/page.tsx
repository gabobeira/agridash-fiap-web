'use client';

import { DashboardMain } from '@/components/DashboardMain';
import { useSalesService } from '@agridash/api';
import { Grid, GridCol, Text } from '@mantine/core';
import {
  FAreaChart,
  FBarChart,
  FCard,
  FLoadingOverlay,
  FScatterChart,
} from '@repo/ui';
import { useEffect } from 'react';

export default function HomeDashboard() {
  const {
    chartData,
    getSalesChartData,
    financialIndicators,
    getFinancialIndicators,
    loading,
  } = useSalesService();
  const {
    cooperativeGroups,
    productGroups,
    cooperativeProfitByDay,
    productVolumeVsProfitMargin,
  } = chartData || {};

  useEffect(() => {
    getSalesChartData();
    getFinancialIndicators();
  }, [getSalesChartData, getFinancialIndicators]);

  // Função para formatar valores monetários
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // Função para formatar percentuais
  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  // Função para formatar números
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  // Transformar dados de lucro por cooperado por dia para o formato do gráfico
  const transformProfitData = () => {
    if (!cooperativeProfitByDay || cooperativeProfitByDay.length === 0)
      return [];

    // Obter lista de cooperados
    const cooperatives = Object.keys(
      cooperativeProfitByDay[0]?.cooperativeProfit || {}
    );

    // Transformar dados para formato de gráfico de área
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

  // Gerar série de dados para o gráfico
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

  if (loading) {
    return <FLoadingOverlay />;
  }

  return (
    <DashboardMain
      title="Visão geral"
      subtitle="Microfrontend independente com componentes compartilhados"
    >
      <Grid justify="space-between" align="stretch" mb="xl">
        {/* Cards de Indicadores Financeiros */}
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

        {/* Gráficos Existentes */}
        <GridCol span={{ base: 12, md: 6 }}>
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
            title="Total de Vendas por Cooperado"
            subtitle="Visualização do valor total de vendas por cooperado."
            customProps={{ h: '100%' }}
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
            customProps={{ h: '100%' }}
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

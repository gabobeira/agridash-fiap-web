import { formatCurrency } from '@/utils/formatters';
import {
  CooperativeProductMix,
  CooperativeProfitByDay,
  ProductPerformanceTrend,
  ProductVolumeVsProfitMargin,
} from '@agridash/api';
import { GridCol } from '@mantine/core';
import {
  FAreaChart,
  FBarChart,
  FCard,
  FLineChart,
  FScatterChart,
} from '@repo/ui';

export function DashboardCharts({
  cooperativeProfitByDay,
  productVolumeVsProfitMargin,
  productPerformanceTrends,
  cooperativeProductMix,
}: Readonly<{
  cooperativeProfitByDay?: CooperativeProfitByDay[];
  productVolumeVsProfitMargin?: ProductVolumeVsProfitMargin[];
  productPerformanceTrends?: ProductPerformanceTrend[];
  cooperativeProductMix?: CooperativeProductMix[];
}>) {
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

  return (
    <>
      <GridCol span={{ base: 12, md: 6 }}>
        <FCard
          title="Top 10 Interações Cooperado x Produto"
          subtitle="Maiores receitas por combinação cooperado-produto."
          customProps={{ h: '100%' }}
        >
          <FBarChart
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
            pl="xl"
          />
        </FCard>
      </GridCol>

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
          title="Performance de Produtos ao Longo do Tempo"
          subtitle="Evolução da receita diária por produto no período."
          customProps={{ h: '100%' }}
        >
          <FLineChart
            h={300}
            data={transformProductTrendsData()}
            dataKey="date"
            series={generateProductTrendsSeries()}
            curveType="linear"
            strokeWidth={2}
            withLegend
            legendProps={{ verticalAlign: 'top', height: 50 }}
          />
        </FCard>
      </GridCol>
    </>
  );
}

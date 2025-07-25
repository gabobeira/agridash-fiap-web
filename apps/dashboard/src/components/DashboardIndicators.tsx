import {
  formatCurrency,
  formatNumber,
  formatPercentage,
} from '@/utils/formatters';
import { FinancialIndicators } from '@agridash/api';
import { GridCol, Text } from '@mantine/core';
import { FCard } from '@repo/ui';

export function DashboardIndicators({
  financialIndicators,
}: Readonly<{
  financialIndicators?: FinancialIndicators | null;
}>) {
  return (
    <>
      <GridCol span={{ base: 12, md: 3 }}>
        <FCard title="Receita Total" customProps={{ h: '100%' }}>
          <Text size="xl" fw="bold" c="#28a745">
            {financialIndicators
              ? formatCurrency(financialIndicators.receitaTotal)
              : 'Carregando...'}
          </Text>
          <Text size="xs" c="neutral.4" mb="sm">
            Valor total de vendas no período. Calculado como: Σ(Preço Unitário ×
            Quantidade Vendida)
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
            Custo total de produção no período. Calculado como: Σ(Custo Unitário
            × Quantidade Produzida)
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
            Percentual de lucro sobre as vendas. Calculado como: (Lucro Total ÷
            Receita Total) × 100
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
            Valor médio por transação. Calculado como: Receita Total ÷ Número de
            Transações
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
            Número total de vendas realizadas no período. Cada venda representa
            uma transação única.
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
    </>
  );
}

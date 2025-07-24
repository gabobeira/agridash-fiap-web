'use client';

import { DashboardMain } from '@/components/DashboardMain';
import { SalesFilters } from '@/components/SalesFilters';
import { useSalesService } from '@agridash/api';
import { FLoadingOverlay, FTable } from '@repo/ui';
import { useEffect, useState } from 'react';

export default function SalesDashboard() {
  const { salesData, loading, getSalesData, totalPages } = useSalesService();
  const [activePage, setActivePage] = useState(1);
  const [appliedFilters, setAppliedFilters] = useState({});

  const handleApplyFilters = (filters: SalesFilters) => {
    setAppliedFilters({
      productId: filters.productId,
      cooperativeId: filters.cooperativeId,
      startDate: filters.startDate ? new Date(filters.startDate) : undefined,
      endDate: filters.endDate ? new Date(filters.endDate) : undefined,
    });
    setActivePage(1);
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

  const salesTableData = salesData.map((sale, idx) => ({
    id: idx,
    data: sale.data.toLocaleDateString('pt-BR'),
    produto: sale.produto,
    cooperado: sale.cooperado,
    quantidadeProduto: sale.quantidadeProduto,
    unidadeMedida: sale.unidadeMedida,
    valorVendaTotal: formatCurrency(sale.valorVendaTotal),
    valorCustoTotal: formatCurrency(sale.valorCustoTotal),
    valorLucro: formatCurrency(sale.valorLucro),
    margemLucro: sale.margemLucro.toFixed(1) + '%',
  }));

  useEffect(() => {
    getSalesData({ page: activePage, includeCount: true, ...appliedFilters });
  }, [activePage, appliedFilters, getSalesData]);

  if (loading) {
    return <FLoadingOverlay />;
  }

  return (
    <DashboardMain
      title="Vendas"
      subtitle="Microfrontend independente com componentes compartilhados"
    >
      <SalesFilters
        applyFilters={handleApplyFilters}
        appliedFilters={appliedFilters}
      />
      <FTable
        title="Tabela de Vendas"
        headers={[
          { label: 'Data', key: 'data' },
          { label: 'Produto', key: 'produto' },
          { label: 'Cooperado', key: 'cooperado' },
          { label: 'Quantidade', key: 'quantidadeProduto' },
          { label: 'Unidade', key: 'unidadeMedida' },
          { label: 'Valor Venda Total', key: 'valorVendaTotal' },
          { label: 'Valor Custo Total', key: 'valorCustoTotal' },
          { label: 'Valor Lucro', key: 'valorLucro' },
          { label: 'Margem de Lucro (%)', key: 'margemLucro' },
        ]}
        data={salesTableData}
        activePage={activePage}
        onChangePage={setActivePage}
        totalPages={totalPages}
        paginate
      />
    </DashboardMain>
  );
}

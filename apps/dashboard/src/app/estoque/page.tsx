'use client';

import { DashboardMain } from '@/components/DashboardMain';
import { useStockService } from '@agridash/api';
import { Badge } from '@mantine/core';
import { FLoadingOverlay, FTable } from '@repo/ui';
import { useEffect } from 'react';

export default function StockDashboard() {
  const { stockProductsData, loading, getStockProducts } = useStockService();

  useEffect(() => {
    getStockProducts();
  }, [getStockProducts]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'BAIXO':
        return 'red';
      case 'MÉDIO':
        return 'yellow';
      case 'ALTO':
        return 'green';
      default:
        return 'gray';
    }
  };

  const renderStatusBadge = (status: string) => {
    const color = getStatusColor(status);
    return (
      <Badge color={color} variant="light">
        {status}
      </Badge>
    );
  };

  const stockProductsTableData = stockProductsData.map(product => ({
    idProduto: product.idProduto,
    nomeProduto: product.nomeProduto,
    unidadeMedida: product.unidadeMedida,
    valorUnitarioProducao: formatCurrency(product.valorUnitarioProducao),
    valorUnitarioVenda: formatCurrency(product.valorUnitarioVenda),
    quantidadeEstoque: product.quantidadeEstoque,
    capacidadeEstoque: product.capacidadeEstoque,
    statusEstoque: renderStatusBadge(product.statusEstoque.toUpperCase()),
  }));

  if (loading) {
    return <FLoadingOverlay />;
  }

  return (
    <DashboardMain
      title="Estoque"
      subtitle="Gerenciamento e monitoramento de inventário de produtos"
    >
      <FTable
        title="Tabela de Estoque"
        headers={[
          { label: 'ID Produto', key: 'idProduto' },
          { label: 'Nome Produto', key: 'nomeProduto' },
          { label: 'Unidade', key: 'unidadeMedida' },
          { label: 'Custo Produção (un.)', key: 'valorUnitarioProducao' },
          { label: 'Valor Venda (un.)', key: 'valorUnitarioVenda' },
          { label: 'Quantidade Estoque', key: 'quantidadeEstoque' },
          { label: 'Capacidade Estoque', key: 'capacidadeEstoque' },
          { label: 'Status', key: 'statusEstoque', width: '100px' },
        ]}
        data={stockProductsTableData}
      />
    </DashboardMain>
  );
}

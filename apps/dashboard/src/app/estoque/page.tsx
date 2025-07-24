'use client';

import { DashboardMain } from '@/components/DashboardMain';
import { useStockService } from '@agridash/api';
import { Badge, Button } from '@mantine/core';
import { FLoadingOverlay, FTable } from '@repo/ui';
import { IconBellRinging } from '@tabler/icons-react';
import { useEffect } from 'react';

export default function StockDashboard() {
  const { stockProductsData, loading, getStockProducts } = useStockService();

  console.log('stockProductsData', stockProductsData);

  useEffect(() => {
    getStockProducts();
  }, [getStockProducts]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

  const handleNotification = (productId: string) => {
    alert(`Enviando notificação para o produto ${productId}`);
  };

  const renderNotificationButton = (productId: string, enabled: boolean) => (
    <Button
      onClick={() => handleNotification(productId)}
      rightSection={<IconBellRinging size={14} />}
      variant="outline"
      size="xs"
      disabled={!enabled}
      color="red.5"
    >
      Notificar
    </Button>
  );

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
    action: renderNotificationButton(product.idProduto, product.alertaEstoque),
  }));

  if (loading) {
    return <FLoadingOverlay />;
  }

  return (
    <DashboardMain
      title="Estoque"
      subtitle="Microfrontend independente com componentes compartilhados"
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
          { label: 'Status', key: 'statusEstoque' },
          { label: 'Ação', key: 'action' },
        ]}
        data={stockProductsTableData}
      />
    </DashboardMain>
  );
}

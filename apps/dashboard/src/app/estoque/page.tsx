'use client';

import { DashboardMain } from '@/components/DashboardMain';
import { useStocks } from '@agridash/api';
import { FTable } from '@repo/ui';
import { useEffect } from 'react';

export default function StockDashboard() {
  const { stocks, loading, error, fetchStocks } = useStocks();

  useEffect(() => {
    fetchStocks();
  }, [fetchStocks]);

  return (
    <DashboardMain
      title="Estoque"
      subtitle="Microfrontend independente com componentes compartilhados"
    >
      <FTable
        title="Tabela de Estoque"
        headers={[
          { key: 'nome_produto', label: 'Produto' },
          { key: 'quantidade_estoque', label: 'Quantidade' },
          { key: 'unidade_medida', label: 'Unidade' },
          { key: 'capacidade_estoque', label: 'Capacidade' },
          { key: 'status_estoque', label: 'Status' },
          { key: 'valor_unitario_producao', label: 'Valor Produção' },
          { key: 'valor_unitario_venda', label: 'Valor Venda' },
        ]}
        data={stocks.map((s, idx) => ({
          id: idx,
          ...s,
        }))}
      />
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>Erro: {error.message}</p>}
    </DashboardMain>
  );
}

'use client';

import { DashboardMain } from '@/components/DashboardMain';
import { FTable } from '@repo/ui';
import { useEffect } from 'react';
import { useTransactions } from '../../services/useTransactions';

export default function TransactionsDashboard() {
  const { transactions, loading, error, fetchTransactions } = useTransactions();

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <DashboardMain
      title="Transações"
      subtitle="Microfrontend independente com componentes compartilhados"
    >
      <FTable
        title="Tabela de Transações"
        headers={[
          { key: 'cooperado', label: 'Cooperado' },
          { key: 'produto', label: 'Produto' },
          { key: 'quantidade', label: 'Quantidade' },
          { key: 'valor', label: 'Valor' },
          { key: 'data', label: 'Data' },
        ]}
        data={transactions.map((t, idx) => ({
          id: idx,
          ...t,
          data: t.data instanceof Date ? t.data.toLocaleDateString() : t.data,
        }))}
      />
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>Erro: {error.message}</p>}
    </DashboardMain>
  );
}

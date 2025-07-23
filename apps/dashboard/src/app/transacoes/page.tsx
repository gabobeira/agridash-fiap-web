'use client';

import { DashboardMain } from '@/components/DashboardMain';
import { useTransactions } from '@agridash/api';
import { FLoadingOverlay, FTable } from '@repo/ui';
import { useEffect } from 'react';

export default function TransactionsDashboard() {
  const { transactions, loading, error, fetchTransactions } = useTransactions();

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  if (loading) {
    return <FLoadingOverlay />;
  }

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
    </DashboardMain>
  );
}

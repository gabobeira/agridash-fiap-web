import { DashboardMain } from '@/components/DashboardMain';
import { FTable } from '@repo/ui';

export default function TransactionsDashboard() {
  return (
    <DashboardMain
      title="Transações"
      subtitle="Microfrontend independente com componentes compartilhados"
    >
      <FTable
        title="Tabela de Transações"
        headers={[
          { key: 'name', label: 'Nome' },
          { key: 'email', label: 'Email' },
          { key: 'age', label: 'Idade' },
        ]}
        data={[
          {
            id: '1',
            name: 'João Silva',
            email: 'joao@email.com',
            age: 30,
          },
          {
            id: '2',
            name: 'Maria Santos',
            email: 'maria@email.com',
            age: 25,
          },
          {
            id: '3',
            name: 'Pedro Costa',
            email: 'pedro@email.com',
            age: 35,
          },
        ]}
      />
    </DashboardMain>
  );
}

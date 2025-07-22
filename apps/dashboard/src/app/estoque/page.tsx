import { DashboardMain } from '@/components/DashboardMain';
import { FTable } from '@repo/ui';

export default function StockDashboard() {
  return (
    <DashboardMain
      title="Estoque"
      subtitle="Microfrontend independente com componentes compartilhados"
    >
      <FTable
        title="Tabela de Estoque"
        headers={[
          { key: 'name', label: 'Nome' },
          { key: 'quantity', label: 'Quantidade' },
          { key: 'price', label: 'Preço' },
        ]}
        data={[
          {
            id: '1',
            name: 'Produto A',
            quantity: 100,
            price: 10.0,
          },
          {
            id: '2',
            name: 'Produto B',
            quantity: 200,
            price: 20.0,
          },
          {
            id: '3',
            name: 'Produto C',
            quantity: 300,
            price: 30.0,
          },
        ]}
      />
    </DashboardMain>
  );
}

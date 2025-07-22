'use client';

import { AppShell } from '@mantine/core';
import { FNavbar, FNavbarLink, FTable } from '@repo/ui';
import {
  IconBell,
  IconBuildingCottage,
  IconBuildingWarehouse,
  IconDatabaseDollar,
} from '@tabler/icons-react';

export default function Dashboard() {
  const navLinks: FNavbarLink[] = [
    { icon: IconBuildingCottage, label: 'Início' },
    { icon: IconDatabaseDollar, label: 'Transações', active: true },
    { icon: IconBuildingWarehouse, label: 'Estoque' },
    { icon: IconBell, label: 'Notificações' },
  ];

  return (
    <AppShell
      navbar={{
        width: 260,
        breakpoint: 'sm',
        collapsed: { mobile: true },
      }}
      padding="md"
    >
      <AppShell.Navbar>
        <FNavbar
          title="AgriDash"
          version="v1.0.0"
          links={navLinks}
          width={260}
          onLogout={() => console.log('Logout')}
        />
      </AppShell.Navbar>
      <AppShell.Main>
        <div className="max-w-8xl mx-auto p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">
              Microfrontend independente com componentes compartilhados
            </p>
          </header>

          <FTable
            title="Tabela de Usuários"
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
        </div>
      </AppShell.Main>
    </AppShell>
  );
}

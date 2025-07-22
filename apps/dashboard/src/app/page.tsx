import { DashboardMain } from '@/components/DashboardMain';
import { Text } from '@mantine/core';

export default function HomeDashboard() {
  return (
    <DashboardMain
      title="Visão geral"
      subtitle="Microfrontend independente com componentes compartilhados"
    >
      <Text>[Inserir gráficos aqui...]</Text>
    </DashboardMain>
  );
}

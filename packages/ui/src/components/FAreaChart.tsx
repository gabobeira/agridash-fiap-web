import { AreaChart } from '@mantine/charts';

import '@mantine/charts/styles.css';

export default function FAreaChart({
  data,
  series,
  dataKey,
}: Readonly<{ data: any; series: any; dataKey: string }>) {
  console.log('FAreaChart data:', data);

  // Verificação de segurança
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div>Nenhum dado disponível para exibir</div>;
  }

  return (
    <AreaChart
      h={300}
      data={data}
      dataKey={dataKey}
      series={series}
      curveType="linear"
    />
  );
}

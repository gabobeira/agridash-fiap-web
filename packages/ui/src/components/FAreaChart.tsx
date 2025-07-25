import { AreaChart, AreaChartSeries } from '@mantine/charts';
import { Center, Text } from '@mantine/core';

import '@mantine/charts/styles.css';

type FAreaChartProps = {
  data: Record<string, unknown>[];
  series: AreaChartSeries[];
  dataKey: string;
};

export default function FAreaChart({ data, series, dataKey }: FAreaChartProps) {
  console.log('FAreaChart data:', data);

  return data && data.length > 0 ? (
    <AreaChart
      h={300}
      data={data}
      dataKey={dataKey}
      series={series}
      curveType="linear"
    />
  ) : (
    <Center w="100%" h={100} bg="neutral.0" bdrs="md">
      <Text c="neutral.4" size="sm">
        Não há dados para exibir!
      </Text>
    </Center>
  );
}

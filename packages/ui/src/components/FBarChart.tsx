import { BarChart, BarChartSeries } from '@mantine/charts';
import { Center, Text } from '@mantine/core';

import '@mantine/charts/styles.css';

type FBarChartProps = {
  data: Record<string, any>[];
  series: BarChartSeries[];
  dataKey: string;
};

export default function FBarChart({ data, series, dataKey }: FBarChartProps) {
  console.log('FBarChart data:', data);

  return data && data.length > 0 ? (
    <BarChart
      h={300}
      data={data}
      dataKey={dataKey}
      series={series}
      tickLine="y"
    />
  ) : (
    <Center w="100%" h={100} bg="neutral.0" bdrs="md">
      <Text c="neutral.4" size="sm">
        Não há dados para exibir!
      </Text>
    </Center>
  );
}

import { ScatterChart, ScatterChartSeries } from '@mantine/charts';
import { Center, Text } from '@mantine/core';

import '@mantine/charts/styles.css';

interface ScatterDataPoint {
  x: number;
  y: number;
  categoria?: string;
  produto?: string;
  [key: string]: unknown;
}

type FScatterChartProps = {
  data: ScatterDataPoint[];
  dataKey: { x: string; y: string };
  xAxisKey?: string;
  yAxisKey?: string;
};

export default function FScatterChart({
  data,
  dataKey,
  xAxisKey,
  yAxisKey,
}: FScatterChartProps) {
  console.log('FScatterChart data:', data);

  // Transformar dados para o formato esperado pelo ScatterChart
  const transformedData: ScatterChartSeries[] =
    data && data.length > 0
      ? [
          {
            name: 'Produtos',
            color: 'blue.6',
            data: data
              .map(item => {
                const xValue = Number(item[dataKey.x] || item.x || 0);
                const yValue = Number(item[dataKey.y] || item.y || 0);

                return {
                  x: xValue,
                  y: yValue,
                };
              })
              .filter(point => !isNaN(point.x) && !isNaN(point.y)),
          },
        ]
      : [];

  return transformedData.length > 0 &&
    transformedData[0] &&
    transformedData[0].data.length > 0 ? (
    <ScatterChart
      h={300}
      data={transformedData}
      dataKey={{ x: 'x', y: 'y' }}
      xAxisLabel={xAxisKey || 'Eixo X'}
      yAxisLabel={yAxisKey || 'Eixo Y'}
    />
  ) : (
    <Center w="100%" h={100} bg="neutral.0" bdrs="md">
      <Text c="neutral.4" size="sm">
        Não há dados para exibir!
      </Text>
    </Center>
  );
}

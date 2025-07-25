import { LineChart, LineChartSeries } from '@mantine/charts';
import { Center, Text } from '@mantine/core';

import '@mantine/charts/styles.css';

type FLineChartProps = {
  data: Record<string, string | number>[];
  series: LineChartSeries[];
  dataKey: string;
  height?: number;
  xAxisLabel?: string;
  yAxisLabel?: string;
  withLegend?: boolean;
  withTooltip?: boolean;
  withYAxis?: boolean;
  withXAxis?: boolean;
  withDots?: boolean;
  curveType?:
    | 'linear'
    | 'natural'
    | 'monotone'
    | 'step'
    | 'stepBefore'
    | 'stepAfter'
    | 'bump';
  strokeWidth?: number;
  valueFormatter?: (value: number) => string;
};

export default function FLineChart({
  data,
  series,
  dataKey,
  height = 300,
  xAxisLabel,
  yAxisLabel,
  withLegend = true,
  withTooltip = true,
  withYAxis = true,
  withXAxis = true,
  withDots = true,
  curveType = 'linear',
  strokeWidth = 2,
  valueFormatter,
}: FLineChartProps) {
  return data && data.length > 0 ? (
    <LineChart
      h={height}
      data={data}
      dataKey={dataKey}
      series={series}
      xAxisLabel={xAxisLabel}
      yAxisLabel={yAxisLabel}
      withLegend={withLegend}
      withTooltip={withTooltip}
      withYAxis={withYAxis}
      withXAxis={withXAxis}
      withDots={withDots}
      curveType={curveType}
      strokeWidth={strokeWidth}
      valueFormatter={valueFormatter}
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

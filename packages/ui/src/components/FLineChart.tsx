import { LineChart, LineChartProps, LineChartSeries } from '@mantine/charts';

import '@mantine/charts/styles.css';
import { FEmptyData } from './FEmptyData';

type FLineChartProps = LineChartProps & {
  data: Record<string, string | number>[];
  series: LineChartSeries[];
  dataKey: string;
};

export default function FLineChart({
  data,
  series,
  dataKey,
  ...otherProps
}: FLineChartProps) {
  return data && data.length > 0 ? (
    <LineChart data={data} dataKey={dataKey} series={series} {...otherProps} />
  ) : (
    <FEmptyData />
  );
}

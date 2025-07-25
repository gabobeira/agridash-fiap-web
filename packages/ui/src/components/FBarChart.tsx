import { BarChart, BarChartProps, BarChartSeries } from '@mantine/charts';

import '@mantine/charts/styles.css';
import { FEmptyData } from './FEmptyData';

type FBarChartProps = BarChartProps & {
  data: Record<string, string | number>[];
  series: BarChartSeries[];
  dataKey: string;
};

export default function FBarChart({
  data,
  series,
  dataKey,
  ...otherProps
}: FBarChartProps) {
  return data && data.length > 0 ? (
    <BarChart data={data} dataKey={dataKey} series={series} {...otherProps} />
  ) : (
    <FEmptyData />
  );
}

import { AreaChart, AreaChartSeries } from '@mantine/charts';

import '@mantine/charts/styles.css';
import { FEmptyData } from './FEmptyData';

type FAreaChartProps = {
  data: Record<string, unknown>[];
  series: AreaChartSeries[];
  dataKey: string;
};

export default function FAreaChart({ data, series, dataKey }: FAreaChartProps) {
  return data && data.length > 0 ? (
    <AreaChart
      h={300}
      data={data}
      dataKey={dataKey}
      series={series}
      curveType="linear"
    />
  ) : (
    <FEmptyData />
  );
}

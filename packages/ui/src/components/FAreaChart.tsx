import { AreaChart } from '@mantine/charts';

import '@mantine/charts/styles.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FAreaChart({ data }: Readonly<{ data: any }>) {
  return (
    <AreaChart
      h={300}
      data={data}
      dataKey="date"
      series={[
        { name: 'Apples', color: 'indigo.6' },
        { name: 'Oranges', color: 'blue.6' },
        { name: 'Tomatoes', color: 'teal.6' },
      ]}
      curveType="linear"
    />
  );
}

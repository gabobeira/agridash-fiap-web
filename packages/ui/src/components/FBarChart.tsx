import { BarChart } from '@mantine/charts';

import '@mantine/charts/styles.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FBarChart({ data }: Readonly<{ data: any }>) {
  return (
    <BarChart
      h={300}
      data={data}
      dataKey="month"
      series={[
        { name: 'Smartphones', color: 'violet.6' },
        { name: 'Laptops', color: 'blue.6' },
        { name: 'Tablets', color: 'teal.6' },
      ]}
      tickLine="y"
    />
  );
}

'use client';

import { DashboardMain } from '@/components/DashboardMain';
import { Grid, GridCol, NativeSelect } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { FAreaChart, FBarChart, FCard } from '@repo/ui';
import { useState } from 'react';

const data = [
  {
    date: 'Mar 22',
    Apples: 2890,
    Oranges: 2338,
    Tomatoes: 2452,
  },
  {
    date: 'Mar 23',
    Apples: 2756,
    Oranges: 2103,
    Tomatoes: 2402,
  },
  {
    date: 'Mar 24',
    Apples: 3322,
    Oranges: 986,
    Tomatoes: 1821,
  },
  {
    date: 'Mar 25',
    Apples: 3470,
    Oranges: 2108,
    Tomatoes: 2809,
  },
  {
    date: 'Mar 26',
    Apples: 3129,
    Oranges: 1726,
    Tomatoes: 2290,
  },
];

const data2 = [
  { month: 'January', Smartphones: 1200, Laptops: 900, Tablets: 200 },
  { month: 'February', Smartphones: 1900, Laptops: 1200, Tablets: 400 },
  { month: 'March', Smartphones: 400, Laptops: 1000, Tablets: 200 },
  { month: 'April', Smartphones: 1000, Laptops: 200, Tablets: 800 },
  { month: 'May', Smartphones: 800, Laptops: 1400, Tablets: 1200 },
  { month: 'June', Smartphones: 750, Laptops: 600, Tablets: 1000 },
];

export default function HomeDashboard() {
  const [product, setProduct] = useState('');
  const [member, setMember] = useState('');
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  return (
    <DashboardMain
      title="Visão geral"
      subtitle="Microfrontend independente com componentes compartilhados"
    >
      <Grid mb="xl">
        <GridCol span={{ base: 12, md: 3 }}>
          <NativeSelect
            value={product}
            onChange={event => setProduct(event.currentTarget.value)}
            label="Produto"
            data={['React', 'Angular', 'Svelte', 'Vue']}
          />
        </GridCol>
        <GridCol span={{ base: 12, md: 3 }}>
          <NativeSelect
            value={member}
            onChange={event => setMember(event.currentTarget.value)}
            label="Cooperado"
            data={['React', 'Angular', 'Svelte', 'Vue']}
          />
        </GridCol>
        <GridCol span={{ base: 12, md: 3 }}>
          <DateInput
            value={startDate}
            onChange={setStartDate}
            label="Data de início"
            placeholder="Data de início"
          />
        </GridCol>
        <GridCol span={{ base: 12, md: 3 }}>
          <DateInput
            value={endDate}
            onChange={setEndDate}
            label="Data de término"
            placeholder="Data de término"
          />
        </GridCol>
      </Grid>

      <Grid justify="space-between" align="stretch" mb="xl">
        <GridCol span={{ base: 12, md: 4 }}>
          <FCard
            title="Indicador 1"
            subtitle="Visualização das vendas de produtos por cooperado ao longo do tempo."
          ></FCard>
        </GridCol>

        <GridCol span={{ base: 12, md: 4 }}>
          <FCard
            title="Indicador 3"
            subtitle="Visualização das vendas de produtos por cooperado ao longo do tempo."
          ></FCard>
        </GridCol>

        <GridCol span={{ base: 12, md: 4 }}>
          <FCard
            title="Indicador 3"
            subtitle="Visualização das vendas de produtos por cooperado ao longo do tempo."
          ></FCard>
        </GridCol>

        <GridCol span={12}>
          <FCard
            title="Gráfico 1"
            subtitle="Visualização das vendas de produtos por cooperado ao longo do tempo."
          >
            <FAreaChart data={data} />
          </FCard>
        </GridCol>

        <GridCol span={12}>
          <FCard
            title="Gráfico 2"
            subtitle="Visualização das vendas de produtos por cooperado ao longo do tempo."
          >
            <FBarChart data={data2} />
          </FCard>
        </GridCol>
      </Grid>
    </DashboardMain>
  );
}

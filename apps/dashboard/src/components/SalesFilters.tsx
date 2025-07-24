import { Button, Grid, GridCol, NativeSelect } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import dayjs from 'dayjs';
import { useState } from 'react';

export type SalesFilters = {
  productId?: string;
  cooperativeId?: string;
  startDate?: string | null;
  endDate?: string | null;
};

export function SalesFilters({
  applyFilters,
  appliedFilters = {},
}: Readonly<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  applyFilters?: (filters: any) => void;
  appliedFilters?: SalesFilters;
}>) {
  const [product, setProduct] = useState<string>(
    appliedFilters.productId || ''
  );
  const [cooperative, setCooperative] = useState<string>(
    appliedFilters.cooperativeId || ''
  );
  const [startDate, setStartDate] = useState<string | null>(
    appliedFilters.startDate || null
  );
  const [endDate, setEndDate] = useState<string | null>(
    appliedFilters.endDate || null
  );

  const handleApplyFilters = () => {
    applyFilters?.({
      productId: product === 'Selecione' ? undefined : product,
      cooperativeId: cooperative === 'Selecione' ? undefined : cooperative,
      startDate: startDate
        ? new Date(dayjs(startDate).toISOString())
        : undefined,
      endDate: endDate ? new Date(dayjs(endDate).toISOString()) : undefined,
    });
  };

  const handleClearFilters = () => {
    setProduct('');
    setCooperative('');
    setStartDate(null);
    setEndDate(null);
  };

  /* 
  Corrigir firebase para liberar o uso de filtros.
  Error fetching sales data: The query requires an index. 
  You can create it here: https://console.firebase.google.com/v1/r/project/control-farm-web-fiap/fire…18QARoNCgljb29wZXJhZG8QARoLCgdwcm9kdXRvEAEaCAoEZGF0YRABGgwKCF9fbmFtZV9fEAE
  */

  return (
    <Grid mb="xl" align="flex-end">
      <GridCol span={{ base: 12, sm: 6, lg: 2 }}>
        <NativeSelect
          value={product}
          onChange={event => setProduct(event.currentTarget.value)}
          label="Produto"
          data={['Selecione', 'Trigo', 'Milho', 'Soja', 'Feijão', 'Arroz']}
          disabled
        />
      </GridCol>
      <GridCol span={{ base: 12, sm: 6, lg: 2 }}>
        <NativeSelect
          value={cooperative}
          onChange={event => setCooperative(event.currentTarget.value)}
          label="Cooperado"
          data={['Selecione', 'Cooperado A', 'Cooperado B', 'Cooperado C']}
          disabled
        />
      </GridCol>
      <GridCol span={{ base: 12, sm: 6, lg: 2 }}>
        <DateInput
          value={startDate}
          onChange={setStartDate}
          label="Data de início"
          placeholder="Data de início"
        />
      </GridCol>
      <GridCol span={{ base: 12, sm: 6, lg: 2 }}>
        <DateInput
          value={endDate}
          onChange={setEndDate}
          label="Data de término"
          placeholder="Data de término"
        />
      </GridCol>
      <GridCol span={{ base: 12, sm: 6, lg: 2 }}>
        <Button w="100%" onClick={handleApplyFilters}>
          Filtrar
        </Button>
      </GridCol>
      <GridCol span={{ base: 12, sm: 6, lg: 2 }}>
        <Button w="100%" variant="outline" onClick={handleClearFilters}>
          Limpar
        </Button>
      </GridCol>
    </Grid>
  );
}

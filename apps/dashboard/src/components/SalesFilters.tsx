import { Button, Grid, GridCol, NativeSelect } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconFilter } from '@tabler/icons-react';
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
  applyFilters?: (filters: SalesFilters) => void;
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

  const handleFilter = () => {
    applyFilters?.({
      productId: product,
      cooperativeId: cooperative,
      startDate,
      endDate,
    });
  };

  return (
    <Grid mb="xl" align="flex-end">
      <GridCol span={{ base: 12, md: 3 }}>
        <NativeSelect
          value={product}
          onChange={event => setProduct(event.currentTarget.value)}
          label="Produto"
          data={['Selecione', 'Trigo', 'Milho', 'Soja', 'Feijão', 'Arroz']}
        />
      </GridCol>
      <GridCol span={{ base: 12, md: 3 }}>
        <NativeSelect
          value={cooperative}
          onChange={event => setCooperative(event.currentTarget.value)}
          label="Cooperado"
          data={['Selecione', 'Cooperado A', 'Cooperado B', 'Cooperado C']}
        />
      </GridCol>
      <GridCol span={{ base: 12, md: 2 }}>
        <DateInput
          value={startDate}
          onChange={setStartDate}
          label="Data de início"
          placeholder="Data de início"
        />
      </GridCol>
      <GridCol span={{ base: 12, md: 2 }}>
        <DateInput
          value={endDate}
          onChange={setEndDate}
          label="Data de término"
          placeholder="Data de término"
        />
      </GridCol>
      <GridCol span={{ base: 12, md: 2 }}>
        <Button
          leftSection={<IconFilter size={16} />}
          w="100%"
          variant="outline"
          onClick={handleFilter}
        >
          Filtrar
        </Button>
      </GridCol>
    </Grid>
  );
}

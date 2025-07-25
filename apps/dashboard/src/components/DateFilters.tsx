import { Button, Grid, GridCol } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import dayjs from 'dayjs';
import { useState } from 'react';

export type DateFilters = {
  startDate?: Date | string | null;
  endDate?: Date | string | null;
};

export function DateFilters({
  applyFilters,
  appliedFilters = {},
}: Readonly<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  applyFilters?: (filters: any) => void;
  appliedFilters?: DateFilters;
}>) {
  const [startDate, setStartDate] = useState<Date | string | null>(
    appliedFilters.startDate || null
  );
  const [endDate, setEndDate] = useState<Date | string | null>(
    appliedFilters.endDate || null
  );

  const handleApplyFilters = () => {
    applyFilters?.({
      startDate: startDate
        ? new Date(dayjs(startDate).toISOString())
        : undefined,
      endDate: endDate ? new Date(dayjs(endDate).toISOString()) : undefined,
    });
  };

  const handleClearFilters = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <Grid mb="xl" align="flex-end">
      <GridCol span={{ base: 12, sm: 6, lg: 4 }}>
        <DateInput
          value={startDate}
          onChange={setStartDate}
          label="Data de início"
          placeholder="Data de início"
        />
      </GridCol>
      <GridCol span={{ base: 12, sm: 6, lg: 4 }}>
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

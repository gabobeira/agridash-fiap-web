'use client';

import { FSensorCard, FWeatherWidget, FDataTable } from '@repo/ui';
import type { FWeatherData, FDataRow } from '@repo/ui';

interface DashboardExampleProps {
  weatherData: FWeatherData;
  sensorData: FDataRow[];
}

export default function DashboardExample({
  weatherData,
  sensorData,
}: Readonly<DashboardExampleProps>) {
  const handleView = (id: string) => {
    console.log('Ver:', id);
  };

  const handleEdit = (id: string) => {
    console.log('Editar:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Deletar:', id);
  };

  return (
    <>
      {/* Sensores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <FSensorCard
          sensorName="Sensor Temperatura"
          sensorType="temperature"
          currentValue={25.5}
          unit="°C"
          minValue={0}
          maxValue={50}
          status="normal"
          location="Setor A - Campo 1"
        />
        <FSensorCard
          sensorName="Sensor Umidade"
          sensorType="humidity"
          currentValue={85}
          unit="%"
          minValue={0}
          maxValue={100}
          status="warning"
          location="Setor B - Campo 2"
        />
        <FSensorCard
          sensorName="Sensor pH"
          sensorType="ph"
          currentValue={3.2}
          unit="pH"
          minValue={0}
          maxValue={14}
          status="critical"
          location="Setor C - Campo 3"
        />
      </div>

      {/* Widget Meteorológico */}
      <div className="mb-8">
        <FWeatherWidget weather={weatherData} />
      </div>

      {/* Tabela de Dados */}
      <FDataTable
        title="Histórico de Leituras dos Sensores"
        data={sensorData}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
}

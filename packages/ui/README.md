# @repo/ui - Biblioteca de Componentes Compartilhados

Biblioteca de componentes React construída sobre Mantine UI, fornecendo componentes base e específicos do domínio agrícola para todos os microfrontends do AgriDash.

## 🎯 Objetivo

Centralizar componentes reutilizáveis, garantir consistência visual e acelerar o desenvolvimento de interfaces para a plataforma AgriDash.

## 📦 Instalação

```bash
# A biblioteca é automaticamente instalada via workspaces
npm install
```

## 🏗️ Arquitetura

### Estrutura de Diretórios

```
src/
├── providers/
│   └── MantineProvider.tsx     # Configuração global Mantine
├── components/
│   ├── base/                   # Wrappers dos componentes Mantine
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Button.tsx
│   └── domain/                 # Componentes específicos AgriDash
│       ├── SensorCard.tsx
│       ├── WeatherWidget.tsx
│       └── DataTable.tsx
└── index.ts                    # Exports centralizados
```

## 🧩 Componentes Disponíveis

### Providers

#### MantineProvider

Configuração global do Mantine UI para toda a aplicação.

```typescript
import { MantineProvider } from '@repo/ui';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <MantineProvider>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
```

### Componentes Base

#### Card

Wrapper do Card do Mantine com configurações padronizadas.

```typescript
import { Card } from '@repo/ui';

<Card title="Título Opcional" shadow="sm" padding="lg">
  <p>Conteúdo do card</p>
</Card>
```

**Props:**

- `title?: string` - Título opcional do card
- Todas as props do `Card` do Mantine

#### Input

Wrapper do TextInput do Mantine para campos de entrada.

```typescript
import { Input } from '@repo/ui';

<Input
  label="Nome do Campo"
  placeholder="Digite aqui..."
  description="Descrição opcional"
  withAsterisk
/>
```

**Props:**

- Todas as props do `TextInput` do Mantine

#### Button

Wrapper do Button do Mantine com estilos consistentes.

```typescript
import { Button } from '@repo/ui';

<Button variant="filled" color="blue">
  Clique Aqui
</Button>
```

**Props:**

- Todas as props do `Button` do Mantine

### Componentes de Domínio

#### SensorCard

Card especializado para exibição de dados de sensores agrícolas.

```typescript
import { SensorCard } from '@repo/ui';

<SensorCard
  sensorName="Sensor de Temperatura"
  sensorType="temperature"
  currentValue={25.5}
  unit="°C"
  minValue={0}
  maxValue={50}
  status="normal"
  location="Setor A - Campo 1"
/>
```

**Props:**

```typescript
interface SensorCardProps {
  sensorName: string;
  sensorType: 'temperature' | 'humidity' | 'ph';
  currentValue: number;
  unit: string;
  minValue: number;
  maxValue: number;
  status: 'normal' | 'warning' | 'critical';
  location?: string;
}
```

**Features:**

- Ícones específicos por tipo de sensor
- Barra de progresso baseada em min/max
- Cores dinâmicas baseadas no status
- Badge de status visual

#### WeatherWidget

Widget para exibição de dados meteorológicos.

```typescript
import { WeatherWidget } from '@repo/ui';

<WeatherWidget
  weather={{
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    condition: 'sunny',
    location: 'Fazenda AgriDash',
  }}
/>
```

**Props:**

```typescript
interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: 'sunny' | 'cloudy' | 'rainy';
  location: string;
}
```

**Features:**

- Ícones dinâmicos baseados na condição climática
- Grid responsivo para múltiplas métricas
- Cores temáticas por condição

#### DataTable

Tabela avançada para gestão de dados agrícolas.

```typescript
import { DataTable } from '@repo/ui';

<DataTable
  title="Dados dos Sensores"
  data={sensorData}
  onView={(id) => console.log('Ver:', id)}
  onEdit={(id) => console.log('Editar:', id)}
  onDelete={(id) => console.log('Deletar:', id)}
/>
```

**Props:**

```typescript
interface DataRow {
  id: string;
  sensorName: string;
  type: string;
  value: number;
  unit: string;
  timestamp: string;
  status: 'normal' | 'warning' | 'critical';
}

interface DataTableProps {
  title?: string;
  data: DataRow[];
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}
```

**Features:**

- Tabela responsiva com scroll
- Actions buttons com ícones
- Status badges coloridos
- Formatação automática de timestamps

## 🎨 Design System

### Cores

```typescript
const colors = {
  primary: 'blue',
  success: 'green',
  warning: 'yellow',
  danger: 'red',
  neutral: 'gray',
};
```

### Iconografia

- **Tabler Icons**: Biblioteca padrão para todos os ícones
- **Contextuais**: Ícones específicos para tipos de sensores
- **Consistentes**: Tamanhos padronizados (16px, 20px, 24px)

### Typography

- **Hierarquia**: Title orders 1-6 do Mantine
- **Pesos**: Regular (400), Medium (500), Semibold (600), Bold (700)
- **Cores**: Dinâmicas baseadas no theme do Mantine

## 🔧 Desenvolvimento

### Adicionando Novos Componentes

#### Componente Base

```typescript
// src/components/base/NovoComponente.tsx
'use client';

import { SomeInput, SomeInputProps } from '@mantine/core';

export type NovoComponenteProps = SomeInputProps;

export default function NovoComponente(props: Readonly<NovoComponenteProps>) {
  return <SomeInput {...props} />;
}
```

#### Componente de Domínio

```typescript
// src/components/domain/ComponenteDominio.tsx
'use client';

import { Card, Text } from '@mantine/core';
import { IconPlant } from '@tabler/icons-react';

export interface ComponenteDominioProps {
  readonly title: string;
  readonly data: any[];
}

export default function ComponenteDominio({ title, data }: ComponenteDominioProps) {
  return (
    <Card>
      <IconPlant size={24} />
      <Text fw={500}>{title}</Text>
      {/* Lógica específica do domínio */}
    </Card>
  );
}
```

### Exportando Componentes

```typescript
// src/index.ts
export { default as NovoComponente } from './components/base/NovoComponente';
export type { NovoComponenteProps } from './components/base/NovoComponente';

export { default as ComponenteDominio } from './components/domain/ComponenteDominio';
export type { ComponenteDominioProps } from './components/domain/ComponenteDominio';
```

## 📦 Dependências

### Principais

- **@mantine/core**: Biblioteca base de componentes
- **@mantine/hooks**: Hooks utilitários do Mantine
- **@tabler/icons-react**: Ícones
- **react** & **react-dom**: Dependências peer

### DevDependencies

- **typescript**: Type checking
- **eslint**: Linting
- **@repo/eslint-config**: Configurações ESLint compartilhadas

## 🧪 Testes

### Estrutura de Testes

```bash
# Executar testes da biblioteca
cd packages/ui
npm run test
```

### Padrões de Teste

```typescript
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import SensorCard from '../SensorCard';

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <MantineProvider>
      {component}
    </MantineProvider>
  );
};

test('renders sensor card with correct data', () => {
  renderWithProvider(
    <SensorCard
      sensorName="Test Sensor"
      sensorType="temperature"
      currentValue={25}
      unit="°C"
      minValue={0}
      maxValue={50}
      status="normal"
    />
  );

  expect(screen.getByText('Test Sensor')).toBeInTheDocument();
  expect(screen.getByText('25°C')).toBeInTheDocument();
});
```

## 🚀 Build e Deploy

### Build da Biblioteca

```bash
npm run build
```

### Type Checking

```bash
npm run check-types
```

### Linting

```bash
npm run lint
```

## 📚 Guidelines

### Nomenclatura

- **PascalCase**: Nomes de componentes
- **camelCase**: Props e funções
- **kebab-case**: Arquivos e pastas

### Props Interface

- Sempre exportar interfaces de props
- Usar `Readonly<>` para props
- Documentar props complexas

### Client Components

- Adicionar `'use client'` quando necessário
- Componentes com event handlers são client-side
- Providers sempre client-side

### Performance

- Lazy loading para componentes pesados
- Memoização quando apropriado
- Tree shaking otimizado

---

**@repo/ui - Componentes Reutilizáveis para o Ecossistema AgriDash**

# Dashboard App - Painel de Controle Agrícola

O Dashboard é um microfrontend independente especializado em visualização de dados agrícolas, métricas de sensores e interfaces de gestão para o AgriDash.

## 🌾 Funcionalidades Principais

### Monitoramento de Sensores

- **SensorCard**: Visualização em tempo real de dados de sensores
- **Status Monitoring**: Indicadores visuais (normal, warning, critical)
- **Multi-sensor Support**: Temperatura, umidade, pH e outros parâmetros
- **Localização**: Identificação precisa da posição dos sensores

### Dashboard Meteorológico

- **WeatherWidget**: Condições climáticas em tempo real
- **Múltiplas Métricas**: Temperatura, umidade, velocidade do vento
- **Interface Visual**: Ícones e cores para diferentes condições climáticas
- **Localização Contextual**: Dados específicos por região/fazenda

### Gestão de Dados

- **DataTable**: Tabela interativa com histórico de leituras
- **CRUD Operations**: Visualizar, editar e excluir registros
- **Filtros Avançados**: Ordenação e busca por múltiplos critérios
- **Export de Dados**: Funcionalidades para relatórios

## 🚀 Tecnologias

- **Next.js 15.4.2** com Turbopack
- **Mantine UI 8.1.3** para componentes especializados
- **Tabler Icons** para iconografia
- **TypeScript 5.8.3** para type safety
- **Tailwind CSS 3.4.17** para layout e responsividade

## 📊 Componentes Especializados

### SensorCard

```typescript
import { SensorCard } from '@repo/ui';

<SensorCard
  sensorName="Sensor Temperatura"
  sensorType="temperature"
  currentValue={25.5}
  unit="°C"
  minValue={0}
  maxValue={50}
  status="normal"
  location="Setor A - Campo 1"
/>
```

### WeatherWidget

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

### DataTable

```typescript
import { DataTable } from '@repo/ui';

<DataTable
  title="Histórico de Leituras"
  data={sensorData}
  onView={handleView}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

## 🏗️ Arquitetura

### Estrutura de Pastas

```
src/
├── app/
│   ├── layout.tsx          # Layout com MantineProvider
│   ├── page.tsx            # Dashboard principal
│   └── globals.css         # Estilos globais
└── components/
    └── DashboardExample.tsx # Componente wrapper client-side
```

### Client vs Server Components

- **Server Components**: Páginas principais e layouts
- **Client Components**: Componentes interativos com event handlers
- **Wrapper Pattern**: DashboardExample para resolver SSR/Client conflicts

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia em localhost:3001

# Build e Deploy
npm run build        # Build para produção
npm run start        # Inicia versão de produção (porta 3001)

# Qualidade de Código
npm run lint         # ESLint
npm run test         # Jest + Testing Library
npm run test:watch   # Testes em modo watch
```

## 📈 Dados e Métricas

### Tipos de Sensores Suportados

- **Temperatura**: 0°C a 50°C com precisão de 0.1°C
- **Umidade**: 0% a 100% com resolução de 1%
- **pH**: 0 a 14 com precisão de 0.1
- **Extensível**: Arquitetura preparada para novos tipos

### Status de Monitoramento

```typescript
type SensorStatus = 'normal' | 'warning' | 'critical';

// Lógica de status baseada em thresholds configuráveis
const getStatus = (value: number, min: number, max: number) => {
  if (value < min * 0.2 || value > max * 0.8) return 'critical';
  if (value < min * 0.4 || value > max * 0.6) return 'warning';
  return 'normal';
};
```

### Interface de Dados

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
```

## 🌐 Integração com Root App

### Navegação

- Header com link de retorno para root app
- Breadcrumb navigation
- Deep linking para funcionalidades específicas

### Estado Compartilhado

- URL parameters para filtros
- Local storage para preferências do usuário
- Session storage para estado temporário

## 🎨 Design System

### Paleta de Cores para Agricultura

- **Green**: Status normal, crescimento, saúde das plantas
- **Yellow/Orange**: Warnings, atenção necessária
- **Red**: Crítico, problemas que requerem ação imediata
- **Blue**: Informações, dados meteorológicos

### Iconografia Especializada

- **Termômetro**: Sensores de temperatura
- **Gota**: Umidade e irrigação
- **Folha**: pH e nutrientes do solo
- **Sol/Nuvem**: Condições meteorológicas

## 📱 Responsividade

### Mobile First

- Cards reorganizados em coluna única
- Tabelas com scroll horizontal
- Menu de navegação colapsável
- Touch-friendly interactions

### Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🧪 Testes Específicos

### Casos de Teste

- Renderização de dados de sensores
- Interações da tabela (ordenação, filtros)
- Responsive behavior
- Estado de loading e error

### Mock Data

```typescript
const mockSensorData = {
  temperature: { value: 25.5, status: 'normal' },
  humidity: { value: 85, status: 'warning' },
  ph: { value: 3.2, status: 'critical' },
};
```

## 🚀 Roadmap

### Próximas Funcionalidades

- Gráficos em tempo real com Chart.js
- Alertas push para status críticos
- Export de relatórios em PDF
- Integração com APIs de sensores reais
- Dashboard customizável por usuário

### Melhorias de Performance

- Virtual scrolling para tabelas grandes
- Lazy loading de componentes pesados
- Cache estratégico de dados
- Otimização de re-renders

---

**Dashboard AgriDash - Visualização Inteligente de Dados Agrícolas**

# 🌾 AgriDash - Sistema de Gestão de Cooperativas Agrícolas

Sistema de gestão para cooperativas agrícolas desenvolvido com **arquitetura microfrontend**, **TypeScript**, **Clean Architecture** e **gerenciamento de estado global**, como projeto FIAP.

Vídeo explicativo: https://youtu.be/9F0-2f7MNPw

## 🏗️ Arquitetura Microfrontend

O projeto implementa uma arquitetura microfrontend utilizando **Turborepo** como sistema de monorepo, permitindo desenvolvimento independente e deploy separado das aplicações:

### Aplicações Independentes

- **Root App** (`apps/root`): Aplicação de autenticação e onboarding
- **Dashboard App** (`apps/dashboard`): Painel de controle e analytics

### Packages Compartilhados

- **API Package** (`packages/api`): Lógica de negócio centralizada
- **UI Package** (`packages/ui`): Componentes reutilizáveis
- **Configurações** (`packages/*-config`): Configurações compartilhadas

```
agridash-fiap-web/
├── apps/
│   ├── root/          # App: Autenticação (porta 3000)
│   └── dashboard/     # App: Dashboard (porta 3001)
├── packages/
│   ├── api/           # Clean Architecture + State Management
│   ├── ui/            # Componentes compartilhados
│   └── *-config/      # Configurações (ESLint, Tailwind, TS)
```

## 🔧 TypeScript (Next.js)

- **Next.js 15** com **TypeScript 5.8** para type safety completo
- **React 19** com tipagem estrita
- Configurações TypeScript compartilhadas via `packages/typescript-config`
- Type safety em todas as camadas da aplicação

## 🏛️ Clean Architecture

Implementação da Clean Architecture no package `packages/api`:

### Domain Layer (Entidades)

```typescript
// packages/api/src/domain/
├── Sale.ts          # Entidade de domínio
├── Stock.ts         # Entidade de domínio
├── SaleRepository.ts    # Interface do repositório
└── StockRepository.ts   # Interface do repositório
```

### Application Layer (Use Cases)

```typescript
// packages/api/src/application/
├── GetFinancialIndicatorsUseCase.ts
├── GetSalesTableDataUseCase.ts
├── GetStockTableDataUseCase.ts
└── ... # Outros use cases
```

### Infrastructure Layer (Repositórios)

```typescript
// packages/api/src/infrastructure/
├── FirebaseSaleRepository.ts   # Implementação Firebase
└── FirebaseStockRepository.ts  # Implementação Firebase
```

## 🌐 Gerenciamento de Estado Global

### Zustand Store

- **AuthStore** (`packages/api/src/auth/AuthStore.ts`): Estado de autenticação global
- State compartilhado entre todas as aplicações microfrontend
- Gerenciamento reativo de autenticação com Firebase

### Hooks Customizados

- **useAuth**: Hook para consumo do estado de autenticação
- **useSalesService**: Gerenciamento de estado de vendas
- **useStockService**: Gerenciamento de estado de estoque

## 📋 Pré-requisitos

- **Node.js** >= 18.0.0
- **npm** >= 10.8.2
- **Conta Firebase** configurada

## 🚀 Instalação e Configuração

### 1. Clone e instale dependências

```bash
git clone https://github.com/gabobeira/agridash-fiap-web.git
cd agridash-fiap-web
npm install
```

### 2. Configure Firebase

Crie `.env.local` na raiz com:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
DASHBOARD_URL=http://localhost:3001
```

## 🎯 Desenvolvimento

### Executar todas as aplicações

```bash
npm run dev
```

- **Root App**: http://localhost:3000 (Autenticação)
- **Dashboard**: http://localhost:3001 (Painel)

### Executar aplicações específicas

```bash
npm run dev:root      # Apenas autenticação
npm run dev:dashboard # Apenas dashboard
```

### Build e validação

```bash
npm run build     # Build de produção
npm run lint      # Linting
npm run validate  # Lint + verificação de tipos
```

## 🎛️ Funcionalidades Implementadas

### Autenticação (Root App)

- Login/cadastro com Firebase Auth
- Proteção de rotas
- Estado global de autenticação

### Dashboard Analytics

- **KPIs Financeiros**: Receita, despesa, lucro, margem
- **Métricas Operacionais**: Ticket médio, produtos vendidos
- **Visualizações**: Top produtos, evolução do lucro, performance

### Gestão de Dados

- **Vendas**: Listagem paginada com filtros por data
- **Estoque**: Controle de inventário e status

## 🚀 Deploy

### Vercel (Recomendado)

1. Fork o repositório
2. Conecte com Vercel
3. Configure variáveis de ambiente
4. Deploy automático por branch

---

**Projeto FIAP** - Demonstração de arquitetura microfrontend com TypeScript, Clean Architecture e gerenciamento de estado global.

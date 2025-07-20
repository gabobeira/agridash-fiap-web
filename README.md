# AgriDash FIAP - Plataforma de Gestão Agrícola

Uma plataforma de gestão agrícola desenvolvida com arquitetura de microfrontends utilizando Next.js e Turborepo.

## 🏗️ Arquitetura

Este projeto implementa uma arquitetura de microfrontends usando **Multi Zones** do Next.js, permitindo desenvolvimento e deploy independente de cada módulo.

### Apps e Packages

- `root`: Aplicação principal Next.js que orquestra os microfrontends (porta 3000)
- `dashboard`: Microfrontend independente com métricas e dados agrícolas (porta 3001)
- `@repo/ui`: Biblioteca de componentes React compartilhados entre os microfrontends
- `@repo/eslint-config`: Configurações ESLint compartilhadas (inclui `eslint-config-next` e `eslint-config-prettier`)
- `@repo/typescript-config`: Configurações TypeScript usadas em todo o monorepo

Cada package/app é 100% [TypeScript](https://www.typescriptlang.org/).

## 🚀 Desenvolvimento

### Pré-requisitos

- Node.js 18+ 
- npm 10.8.2+

### Instalação

```bash
# Clone o repositório
git clone https://github.com/gabobeira/agridash-fiap-web.git
cd agridash-fiap-web

# Instale as dependências
npm install
```

### Executando o Projeto

#### Opção 1: Executar todos os microfrontends (Recomendado)
```bash
npm run dev:microfrontends
```
Isso inicia simultaneamente:
- Root app: http://localhost:3000
- Dashboard: http://localhost:3001

#### Opção 2: Executar apps individualmente
```bash
# App principal (root)
npm run dev:root

# Dashboard microfrontend
npm run dev:dashboard

# Todos os apps
npm run dev
```

### Acessando a Aplicação

- **Página inicial**: http://localhost:3000
- **Dashboard direto**: http://localhost:3001/dashboard
- **Dashboard via root**: http://localhost:3000/dashboard (recomendado)

## 🧪 Testes

O projeto usa Jest para todos os testes:

```bash
# Executar todos os testes
npm run test

# Executar testes em modo watch
npm run test:watch

# Executar apenas testes do UI package
npm run test --filter=@repo/ui
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev                    # Inicia todos os apps
npm run dev:root              # Apenas o app principal
npm run dev:dashboard         # Apenas o dashboard
npm run dev:microfrontends    # Root + Dashboard simultaneamente

# Build e produção
npm run build                 # Build de todos os apps
npm run build --filter=root  # Build apenas do app root

# Qualidade de código
npm run lint                  # ESLint em todos os packages
npm run format               # Formatar código com Prettier
npm run check-types          # Verificação de tipos TypeScript
npm run validate             # Lint + tipos + testes + versões

# Utilitários
npm run check-versions       # Verificar consistência de dependências
```

## 🛠️ Ferramentas Incluídas

- [TypeScript](https://www.typescriptlang.org/) para tipagem estática
- [ESLint](https://eslint.org/) para linting de código
- [Prettier](https://prettier.io) para formatação de código
- [Jest](https://jestjs.io/) para testes de apps Next.js
- [Jest](https://jestjs.io/) para todos os testes
- [Testing Library](https://testing-library.com/) para testes de React
- [Tailwind CSS](https://tailwindcss.com/) para estilização
- [Turborepo](https://turborepo.org/) para gerenciamento do monorepo

## 🏢 Estrutura do Projeto

```
agridash-fiap-web/
├── apps/
│   ├── root/                 # App principal (porta 3000)
│   │   ├── src/app/         # Páginas e componentes
│   │   ├── jest.config.js   # Configuração de testes
│   │   └── next.config.ts   # Configuração Next.js + rewrites
│   └── dashboard/           # Microfrontend dashboard (porta 3001)
│       ├── src/app/        # Páginas específicas do dashboard
│       ├── jest.config.js  # Configuração de testes
│       └── next.config.ts  # Configuração Next.js + CORS
├── packages/
│   ├── ui/                 # Componentes React compartilhados
│   │   ├── src/Card/      # Exemplo: componente Card
│   │   └── jest.config.js    # Configuração de testes Jest
│   ├── eslint-config/     # Configurações ESLint compartilhadas
│   └── typescript-config/ # Configurações TypeScript
├── scripts/
│   └── check-versions.js  # Script de validação de dependências
├── turbo.json             # Configuração do Turborepo
└── package.json           # Scripts principais do monorepo
```

## 🌐 Produção

### Variáveis de Ambiente

Para produção, configure a variável de ambiente no app root:

```bash
# .env.production (app root)
DASHBOARD_URL=https://dashboard.agridash.com
```

### Deploy

Cada microfrontend pode ser deployado independentemente:

```bash
# Build para produção
npm run build

# Build específico
npm run build --filter=root
npm run build --filter=dashboard
```

## 🔍 Validação e Qualidade

O projeto inclui validações automáticas:

```bash
# Validação completa (recomendado antes de commits)
npm run validate

# Verificações individuais
npm run lint          # ESLint
npm run check-types   # TypeScript
npm run test          # Testes
npm run check-versions # Consistência de dependências
```

## 📚 Documentação Adicional

- [README - App Root](./apps/root/README.md)
- [README - Dashboard](./apps/dashboard/README.md)
- [README - UI Components](./packages/ui/README.md)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Execute as validações (`npm run validate`)
4. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
5. Push para a branch (`git push origin feature/AmazingFeature`)
6. Abra um Pull Request

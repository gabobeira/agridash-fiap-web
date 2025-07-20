# AgriDash FIAP - Plataforma de Gestão Agrícola

Uma plataforma moderna de gestão agrícola construída com arquitetura de microfrontends usando Next.js, TypeScript e Mantine UI.

## 🌱 Visão Geral

O AgriDash é uma solução completa para monitoramento e gestão de dados agrícolas, desenvolvida como projeto para a FIAP. A plataforma utiliza uma arquitetura de microfrontends para garantir escalabilidade, manutenibilidade e desenvolvimento independente de funcionalidades.

## 🏗️ Arquitetura

### Microfrontends

- **Root App** (`:3000`) - Portal principal e navegação
- **Dashboard** (`:3001`) - Painel de controle e métricas

### Pacotes Compartilhados

- **`@repo/ui`** - Biblioteca de componentes com Mantine UI
- **`@repo/eslint-config`** - Configurações ESLint compartilhadas
- **`@repo/tailwind-config`** - Configurações Tailwind CSS
- **`@repo/typescript-config`** - Configurações TypeScript

## 🚀 Tecnologias

- **Framework**: Next.js 15.4.2 com Turbopack
- **Linguagem**: TypeScript 5.8.3
- **UI Library**: Mantine UI 8.1.3
- **Estilização**: Tailwind CSS 3.4.17
- **Monorepo**: Turborepo
- **Testes**: Jest + Testing Library
- **Lint**: ESLint 9
- **Icons**: Tabler Icons

## 📦 Estrutura do Projeto

```
agridash-fiap-web/
├── apps/
│   ├── root/           # Portal principal (:3000)
│   └── dashboard/      # Dashboard (:3001)
├── packages/
│   ├── ui/             # Componentes compartilhados
│   ├── eslint-config/  # ESLint config
│   ├── tailwind-config/# Tailwind config
│   └── typescript-config/ # TypeScript config
├── package.json        # Configuração principal
└── turbo.json         # Configuração Turborepo
```

## 🔧 Instalação e Execução

### Pré-requisitos

- Node.js 18+
- npm 8+

### Instalação

```bash
# Clone o repositório
git clone https://github.com/gabobeira/agridash-fiap-web.git
cd agridash-fiap-web

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
# Executa todos os microfrontends simultaneamente
npm run dev

# URLs disponíveis:
# - Root App: http://localhost:3000
# - Dashboard: http://localhost:3001
```

### Scripts Disponíveis

```bash
npm run dev        # Desenvolvimento (todos os apps)
npm run build      # Build para produção
npm run lint       # Linting de todos os pacotes
npm run test       # Executa testes
npm run test:watch # Testes em modo watch
```

## 🎨 Componentes UI

A biblioteca `@repo/ui` oferece:

### Componentes Base (Mantine Wrappers)

- **Card** - Cards responsivos com shadow e border
- **Input** - Campos de entrada baseados em TextInput
- **Button** - Botões com variações e cores

### Componentes de Domínio (AgriDash Específicos)

- **SensorCard** - Cards para exibição de dados de sensores
- **WeatherWidget** - Widget meteorológico com dados em tempo real
- **DataTable** - Tabela avançada com ações CRUD

### Providers

- **MantineProvider** - Configuração global do Mantine UI

## 🌾 Funcionalidades Agrícolas

### Monitoramento de Sensores

- Temperatura, umidade e pH do solo
- Status em tempo real (normal, warning, critical)
- Localização e identificação de sensores

### Dashboard Meteorológico

- Condições climáticas atuais
- Temperatura, umidade e velocidade do vento
- Interface visual intuitiva

### Gestão de Dados

- Tabelas interativas com histórico
- Ações de visualizar, editar e excluir
- Filtros e ordenação de dados

## 🧪 Testes

```bash
# Executar todos os testes
npm run test

# Testes em modo watch
npm run test:watch

# Testes com coverage
npm run test -- --coverage
```

## 📚 Documentação de Desenvolvimento

### Adicionando Novo Microfrontend

1. Criar pasta em `apps/`
2. Configurar `package.json` com dependência `@repo/ui`
3. Adicionar script de dev na porta específica
4. Atualizar `turbo.json`

### Criando Componentes UI

```typescript
// packages/ui/src/components/domain/MeuComponente.tsx
'use client';

import { Card, Text } from '@mantine/core';

export interface MeuComponenteProps {
  readonly title: string;
}

export default function MeuComponente({ title }: MeuComponenteProps) {
  return (
    <Card>
      <Text>{title}</Text>
    </Card>
  );
}
```

### Importando Componentes

```typescript
// Em qualquer app
import { Card, SensorCard, MantineProvider } from '@repo/ui';
```

## 🚀 Deploy

O projeto está configurado para deploy em Vercel:

```bash
# Build de produção
npm run build

# O Vercel detecta automaticamente a configuração do monorepo
```

## 👥 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é desenvolvido para fins educacionais como parte do curso da FIAP.

## 🏫 FIAP

Projeto desenvolvido como parte do curso de Tecnologia da FIAP.

---

**Desenvolvido com ❤️ para a comunidade agrícola**

# Root App - Portal Principal AgriDash

O app root é o portal principal do AgriDash, responsável por orquestrar a navegação entre os microfrontends e fornecer uma experiência unificada aos usuários.

## 🎯 Funcionalidades

- **Portal de Navegação**: Interface principal para acessar diferentes microfrontends
- **Demonstração Mantine UI**: Showcases dos componentes da biblioteca compartilhada
- **Integração Seamless**: Navegação fluida entre microfrontends
- **Design System**: Implementação consistente do design system AgriDash

## 🚀 Tecnologias

- **Next.js 15.4.2** com Turbopack para performance otimizada
- **Mantine UI 8.1.3** para componentes de interface
- **Tailwind CSS 3.4.17** para estilização utilitária
- **TypeScript 5.8.3** para type safety

## 📱 Páginas e Rotas

### Home (`/`)

- Portal principal com navegação para microfrontends
- Cards informativos sobre cada módulo
- Demonstração de componentes Mantine UI
- Links diretos para Dashboard e outros apps

### Layout Global

- Configuração do MantineProvider
- Fontes Geist Sans e Geist Mono
- Configuração global de estilos

## 🧩 Componentes Demonstrados

### Componentes Base

```typescript
import { Card, Input, Button } from '@repo/ui';

// Exemplos de uso dos componentes base
<Input label="Nome do Sensor" placeholder="Digite..." />
<Button variant="filled" color="blue">Salvar</Button>
<Card title="Título">Conteúdo</Card>
```

### Integração com Mantine

- Demonstração de formulários com componentes Mantine
- Showcase de diferentes variações de componentes
- Exemplos de integração Tailwind + Mantine

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia em localhost:3000

# Build e Deploy
npm run build        # Build para produção
npm run start        # Inicia versão de produção

# Qualidade de Código
npm run lint         # ESLint
npm run test         # Jest + Testing Library
npm run test:watch   # Testes em modo watch
```

## 🏗️ Arquitetura

### Estrutura de Pastas

```
src/
├── app/
│   ├── layout.tsx    # Layout global com MantineProvider
│   ├── page.tsx      # Página principal
│   └── globals.css   # Estilos globais
└── components/       # Componentes específicos do root (se houver)
```

### Dependências Principais

- `@repo/ui` - Biblioteca de componentes compartilhados
- `next` - Framework React
- `react` & `react-dom` - Biblioteca React

## 🌐 Navegação Entre Microfrontends

### Links Internos (Next.js Router)

```typescript
// Para rotas dentro do mesmo app
<Link href="/sobre">Sobre</Link>
```

### Links Externos (Microfrontends)

```typescript
// Para acessar outros microfrontends
<a href="http://localhost:3001/dashboard" target="_blank">
  Dashboard Direto
</a>
```

## 🎨 Design System

### Cores Primárias

- **Blue 600**: Cor principal para CTAs
- **Green**: Para status positivos e dados agrícolas
- **Yellow**: Para warnings e alertas
- **Red**: Para status críticos

### Typography

- **Geist Sans**: Fonte principal para interface
- **Geist Mono**: Fonte mono para códigos e dados

### Spacing e Layout

- Container responsivo com max-width
- Grid system usando Tailwind CSS
- Componentes com padding e margin consistentes

## 🔗 Integração com Dashboard

O root app conecta-se com o dashboard através de:

- Links diretos para `localhost:3001`
- Iframe embedding (se necessário)
- Shared state através de URL parameters
- Consistent design system via `@repo/ui`

## 📊 Performance

- **Turbopack**: Build e hot reload ultra-rápido
- **Code Splitting**: Carregamento sob demanda
- **Image Optimization**: Otimização automática de imagens
- **CSS-in-JS**: Mantine + Tailwind para performance

## 🧪 Testes

### Estrutura de Testes

```
__tests__/
├── page.test.tsx     # Testes da página principal
└── components/       # Testes de componentes
```

### Cobertura de Testes

- Renderização de componentes
- Navegação entre rotas
- Integração com Mantine UI
- Responsividade

---

**Portal Principal do AgriDash - Conectando todos os microfrontends**

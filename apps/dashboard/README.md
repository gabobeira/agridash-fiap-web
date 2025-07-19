# AgriDash FIAP - Dashboard Microfrontend

Este é o microfrontend Dashboard do AgriDash FIAP, responsável por exibir métricas, gráficos e dados agrícolas.

## Sobre o Dashboard

O Dashboard é um microfrontend independente que fornece:
- Painel de métricas agrícolas
- Gráficos e visualizações de dados
- Interface de navegação de volta ao app principal
- Componentes compartilhados do `@repo/ui`

## Desenvolvimento

Para executar apenas o Dashboard:

```bash
npm run dev:dashboard
```

Para executar todos os microfrontends:

```bash
npm run dev:microfrontends
```

## Configuração

- **Porto**: 3001
- **Base Path**: `/dashboard`
- **Integração**: Conectado ao Root App via rewrites
- **CORS**: Configurado para permitir integração com outros microfrontends

## Navegação

- **Acesso direto**: `http://localhost:3001/dashboard`
- **Via Root App**: `http://localhost:3000/dashboard`

## Build

```bash
npm run build
```

Gera uma build independente que pode ser deployed separadamente.

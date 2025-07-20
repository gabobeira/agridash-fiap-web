# @repo/tailwind-config

Configuração compartilhada do Tailwind CSS v3.4.17 para o projeto AgriDash.

## Uso

```javascript
import sharedConfig from '@repo/tailwind-config';

/** @type {import('tailwindcss').Config} */
export default {
  ...sharedConfig,
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  // Sobrescrever ou estender configurações específicas se necessário
  theme: {
    ...sharedConfig.theme,
    extend: {
      ...sharedConfig.theme.extend,
      // Configurações específicas do projeto
    },
  },
};
```

## Cores Disponíveis

### Brand

- `brand-50` até `brand-950` - Cores principais da marca

### Estados

- `success-50` até `success-950` - Verde para sucesso
- `warning-50` até `warning-950` - Amarelo para avisos
- `danger-50` até `danger-950` - Vermelho para erros
- `neutral-50` até `neutral-950` - Cinzas neutros

## Tipografia

- Fonte padrão: Inter
- Fonte mono: JetBrains Mono

## Animações

- `animate-fade-in` - Fade in suave
- `animate-slide-up` - Deslizar para cima
- `animate-slide-down` - Deslizar para baixo

## Sombras

- `shadow-soft` - Sombra suave
- `shadow-medium` - Sombra média
- `shadow-hard` - Sombra intensa

## Configuração do PostCSS

Para usar o Tailwind CSS v3.4.17, certifique-se de que seu `postcss.config.mjs` está configurado assim:

```javascript
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
```

## CSS Global

No seu arquivo `globals.css`, use as diretivas do Tailwind v3:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

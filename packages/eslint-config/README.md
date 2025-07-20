# @repo/eslint-config - Configurações ESLint Compartilhadas

Configurações ESLint padronizadas para todos os apps e packages do monorepo AgriDash, garantindo qualidade e consistência de código.

## 📦 Configurações Disponíveis

### base.js

Configuração base para projetos JavaScript/TypeScript.

```javascript
module.exports = {
  extends: ['@repo/eslint-config/base'],
};
```

**Inclui:**

- ESLint recommended rules
- TypeScript ESLint integration
- Import/export best practices
- Unused variables detection

### next.js

Configuração especializada para aplicações Next.js.

```javascript
module.exports = {
  extends: ['@repo/eslint-config/next'],
};
```

**Inclui:**

- Configuração base
- Next.js specific rules
- React hooks rules
- Next.js performance optimizations

### react-internal.js

Configuração para componentes React internos (biblioteca @repo/ui).

```javascript
module.exports = {
  extends: ['@repo/eslint-config/react-internal'],
};
```

**Inclui:**

- Configuração base
- React best practices
- Component naming conventions
- Props validation

## 🔧 Uso nos Projetos

### Apps Next.js

```javascript
// apps/*/eslint.config.mjs
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...compat.extends('@repo/eslint-config/next')];

export default eslintConfig;
```

### Packages React

```javascript
// packages/ui/eslint.config.mjs
const eslintConfig = [...compat.extends('@repo/eslint-config/react-internal')];

export default eslintConfig;
```

## 🛠️ Regras Personalizadas

### TypeScript

- Strict type checking
- No unused variables
- Prefer interfaces over types
- Consistent naming conventions

### React

- Hooks dependencies validation
- No direct state mutation
- Component display names
- Props validation

### Next.js

- Image optimization enforcement
- Link component usage
- API routes best practices
- Performance optimizations

## 📋 Scripts Recomendados

```json
{
  "scripts": {
    "lint": "eslint . --max-warnings 0",
    "lint:fix": "eslint . --fix",
    "lint:check": "eslint . --max-warnings 0 --quiet"
  }
}
```

## 🚀 Extensão Personalizada

Para adicionar regras específicas do projeto:

```javascript
module.exports = {
  extends: ['@repo/eslint-config/next'],
  rules: {
    // Suas regras customizadas
    '@typescript-eslint/no-unused-vars': 'error',
    'prefer-const': 'error',
  },
};
```

---

**Qualidade de código consistente em todo o monorepo AgriDash**

# @repo/typescript-config - Configurações TypeScript Compartilhadas

Configurações TypeScript padronizadas para todos os apps e packages do monorepo AgriDash, garantindo type safety e consistência.

## 📦 Configurações Disponíveis

### base.json

Configuração base para projetos TypeScript.

```json
{
  "extends": "@repo/typescript-config/base.json"
}
```

**Inclui:**

- Strict mode habilitado
- Module resolution padrão
- Decorators support
- Path mapping básico

### nextjs.json

Configuração otimizada para aplicações Next.js.

```json
{
  "extends": "@repo/typescript-config/nextjs.json"
}
```

**Inclui:**

- Configuração base
- Next.js specific settings
- App Router support
- React JSX transform

### react-library.json

Configuração para bibliotecas React (como @repo/ui).

```json
{
  "extends": "@repo/typescript-config/react-library.json"
}
```

**Inclui:**

- Configuração base
- Declaration files generation
- Source maps
- Optimized for bundling

## 🔧 Uso nos Projetos

### Apps Next.js

```json
// apps/*/tsconfig.json
{
  "extends": "@repo/typescript-config/nextjs.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Packages React

```json
// packages/ui/tsconfig.json
{
  "extends": "@repo/typescript-config/react-library.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## ⚙️ Configurações Detalhadas

### base.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "noUncheckedIndexedAccess": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### nextjs.json Específico

```json
{
  "extends": "./base.json",
  "compilerOptions": {
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"]
}
```

### react-library.json Específico

```json
{
  "extends": "./base.json",
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "dist",
    "rootDir": "src",
    "jsx": "react-jsx"
  }
}
```

## 🛠️ Regras TypeScript Strict

### Type Safety

- `strict: true` - Todas as verificações strict habilitadas
- `noUncheckedIndexedAccess: true` - Segurança em acessos de array/objeto
- `exactOptionalPropertyTypes: true` - Propriedades opcionais exatas

### Code Quality

- `noUnusedLocals: true` - Detecta variáveis não utilizadas
- `noUnusedParameters: true` - Detecta parâmetros não utilizados
- `noImplicitReturns: true` - Força return explícito

### Module Resolution

- `moduleResolution: "bundler"` - Otimizado para bundlers modernos
- `allowSyntheticDefaultImports: true` - Imports default flexíveis
- `esModuleInterop: true` - Interoperabilidade CommonJS/ESM

## 📋 Path Mapping Comum

### Apps

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/styles/*": ["./src/styles/*"]
    }
  }
}
```

### Packages

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@/components/*": ["./components/*"],
      "@/utils/*": ["./utils/*"]
    }
  }
}
```

## 🔍 Type Checking Scripts

### Package.json Recomendado

```json
{
  "scripts": {
    "type-check": "tsc --noEmit",
    "type-check:watch": "tsc --noEmit --watch",
    "build-types": "tsc --declaration --emitDeclarationOnly"
  }
}
```

## 🌐 Suporte a Monorepo

### Referências de Projetos

```json
{
  "references": [
    { "path": "./apps/root" },
    { "path": "./apps/dashboard" },
    { "path": "./packages/ui" }
  ]
}
```

### Build Incremental

```json
{
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": ".tsbuildinfo"
  }
}
```

## 🧪 Testing Configuration

### Jest Types

```json
{
  "compilerOptions": {
    "types": ["jest", "@testing-library/jest-dom"]
  }
}
```

### Test Files

```json
{
  "include": ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"]
}
```

## 🚀 Performance Optimization

### Compiler Options

```json
{
  "compilerOptions": {
    "skipLibCheck": true, // Pula verificação de .d.ts
    "assumeChangesOnlyAffectDirectDependencies": true,
    "disableSourceOfProjectReferenceRedirect": true
  }
}
```

### IDE Settings

```json
{
  "typescript.preferences.includePackageJsonAutoImports": "on",
  "typescript.suggest.autoImports": true
}
```

---

**TypeScript configurado para máxima produtividade e type safety no AgriDash**

# @repo/tailwind-config - Configurações Tailwind CSS Compartilhadas

Configuração base do Tailwind CSS para todos os apps do monorepo AgriDash, garantindo consistência visual e otimização do bundle.

## 🎨 Configuração

### Uso nos Apps

```javascript
// apps/*/tailwind.config.js
const sharedConfig = require('@repo/tailwind-config');

module.exports = {
  ...sharedConfig,
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}', // Inclui componentes da UI lib
  ],
};
```

## 🎯 Customizações AgriDash

### Paleta de Cores Agrícola

```javascript
colors: {
  // Cores base mantidas do Tailwind
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  },

  // Cores específicas para agricultura
  agri: {
    green: '#22c55e',     // Plantas saudáveis
    soil: '#92400e',      // Terra/solo
    water: '#0ea5e9',     // Irrigação
    sun: '#f59e0b',       // Sol/energia
    warning: '#f97316',   // Alertas
    danger: '#ef4444',    // Problemas críticos
  }
}
```

### Typography Especializada

```javascript
fontFamily: {
  sans: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
  mono: ['Geist Mono', 'Monaco', 'monospace'],
  display: ['Geist', 'Inter', 'sans-serif'], // Para títulos
}
```

### Spacing Personalizado

```javascript
spacing: {
  // Espaçamentos específicos para dashboards
  'card': '1.5rem',     // 24px - padding padrão de cards
  'section': '2rem',    // 32px - espaçamento entre seções
  'page': '3rem',       // 48px - padding de páginas
}
```

## 📱 Responsividade AgriDash

### Breakpoints Otimizados

```javascript
screens: {
  'xs': '475px',        // Celulares pequenos
  'sm': '640px',        // Celulares
  'md': '768px',        // Tablets
  'lg': '1024px',       // Laptops
  'xl': '1280px',       // Desktop
  '2xl': '1536px',      // Monitores grandes

  // Breakpoints específicos para dashboards
  'dashboard-sm': '900px',  // Layout de dashboard compacto
  'dashboard-lg': '1200px', // Layout de dashboard expandido
}
```

## 🧩 Componentes Utilitários

### Classes Personalizadas

```css
@layer utilities {
  .card-shadow {
    @apply shadow-lg hover:shadow-xl transition-shadow duration-200;
  }

  .agri-gradient {
    @apply bg-gradient-to-br from-green-50 to-blue-50;
  }

  .sensor-normal {
    @apply bg-green-100 text-green-800 border-green-200;
  }

  .sensor-warning {
    @apply bg-yellow-100 text-yellow-800 border-yellow-200;
  }

  .sensor-critical {
    @apply bg-red-100 text-red-800 border-red-200;
  }
}
```

## 🎨 Design Tokens

### Grid System

```javascript
gridTemplateColumns: {
  'dashboard': 'repeat(auto-fit, minmax(300px, 1fr))',
  'sensors': 'repeat(auto-fit, minmax(250px, 1fr))',
  'metrics': 'repeat(auto-fit, minmax(200px, 1fr))',
}
```

### Animations

```javascript
animation: {
  'sensor-pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  'fade-in': 'fadeIn 0.5s ease-in-out',
  'slide-up': 'slideUp 0.3s ease-out',
}

keyframes: {
  fadeIn: {
    '0%': { opacity: '0', transform: 'translateY(10px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' }
  },
  slideUp: {
    '0%': { transform: 'translateY(100%)' },
    '100%': { transform: 'translateY(0)' }
  }
}
```

## 🔧 Otimizações

### Content Purging

```javascript
content: [
  "./src/**/*.{js,ts,jsx,tsx}",
  "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
],
```

### Plugin Configuration

```javascript
plugins: [
  require('@tailwindcss/forms'), // Estilização de formulários
  require('@tailwindcss/typography'), // Tipografia avançada
  require('@tailwindcss/container-queries'), // Container queries
];
```

## 🌱 Classes Específicas AgriDash

### Status de Sensores

```html
<!-- Sensor normal -->
<div class="sensor-normal p-4 rounded-lg border">
  Sensor funcionando normalmente
</div>

<!-- Sensor com warning -->
<div class="sensor-warning p-4 rounded-lg border">Atenção necessária</div>

<!-- Sensor crítico -->
<div class="sensor-critical p-4 rounded-lg border">Intervenção urgente</div>
```

### Layout de Dashboard

```html
<!-- Grid responsivo para sensores -->
<div class="grid grid-cols-sensors gap-6">
  <!-- Sensor cards aqui -->
</div>

<!-- Container principal -->
<div class="agri-gradient min-h-screen p-page">
  <!-- Conteúdo da aplicação -->
</div>
```

## 📊 Performance

### Bundle Size Optimization

- Purge automático de classes não utilizadas
- Tree shaking de componentes
- Lazy loading de utilitários pesados

### Build Optimization

```javascript
module.exports = {
  // ... outras configurações
  experimental: {
    optimizeUniversalDefaults: true,
  },
};
```

## 🎯 Integração com Mantine

### Conflitos Resolvidos

```javascript
// Desabilita reset do Tailwind para evitar conflitos
corePlugins: {
  preflight: false, // Mantine tem seu próprio normalize
}

// Configuração de importante para override
important: false, // Permite que Mantine tenha precedência
```

### Classes Complementares

```css
/* Tailwind para layout, Mantine para componentes */
.dashboard-layout {
  @apply container mx-auto px-4 py-8;
  /* Mantine components inside inherit properly */
}
```

---

**Tailwind CSS otimizado para agricultura e dashboards do AgriDash**

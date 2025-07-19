# Card Component

Um componente Card simples e reutilizável construído com React e Tailwind CSS.

## Instalação

Este componente faz parte do pacote `@repo/ui`. Certifique-se de que o Tailwind CSS esteja configurado em seu projeto.

## Uso Básico

```tsx
import { Card } from '@repo/ui';

// Card simples
<Card>
  <p>Conteúdo do card</p>
</Card>

// Card com título
<Card title="Título do Card">
  <p>Conteúdo do card</p>
</Card>

// Card com classes personalizadas
<Card className="max-w-md">
  <p>Card com largura máxima</p>
</Card>
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `children` | `React.ReactNode` | - | Conteúdo do card |
| `title` | `string` | - | Título opcional do card |
| `className` | `string` | `''` | Classes CSS adicionais |

## Exemplos

```tsx
// Card de informação
<Card title="Estatísticas">
  <div className="text-center">
    <div className="text-3xl font-bold text-blue-600">1,234</div>
    <div className="text-sm text-gray-600">Usuários Ativos</div>
  </div>
</Card>

// Card de produto
<Card title="Produto" className="max-w-sm">
  <img src="produto.jpg" alt="Produto" className="w-full h-48 object-cover mb-4" />
  <div className="flex justify-between items-center">
    <span className="text-2xl font-bold text-green-600">R$ 99,90</span>
    <button className="bg-blue-500 text-white px-4 py-2 rounded">
      Comprar
    </button>
  </div>
</Card>
```

## Testes

Execute os testes com:

```bash
npm test
```

O componente inclui testes básicos de renderização usando Vitest e Testing Library.

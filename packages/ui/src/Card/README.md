# Card Component

Um componente Card simples e reutilizável construído com React e Tailwind CSS.

## Instalação

Este componente faz parte do pacote `@repo/ui`. Certifique-se de que o Tailwind CSS e o `@repo/tailwind-config` estejam configurados em seu projeto.

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

## Variantes

O componente Card suporta diferentes variantes com cores do design system:

```tsx
// Card padrão
<Card title="Card Padrão">Conteúdo normal</Card>

// Card com tema da marca
<Card variant="brand" title="Card da Marca">Destacar conteúdo importante</Card>

// Card de sucesso
<Card variant="success" title="Sucesso">Operação realizada com sucesso</Card>

// Card de aviso
<Card variant="warning" title="Atenção">Informação que requer atenção</Card>

// Card de erro
<Card variant="danger" title="Erro">Algo deu errado</Card>
```

## Props

| Prop        | Tipo                                                         | Padrão      | Descrição               |
| ----------- | ------------------------------------------------------------ | ----------- | ----------------------- |
| `children`  | `React.ReactNode`                                            | -           | Conteúdo do card        |
| `title`     | `string`                                                     | -           | Título opcional do card |
| `className` | `string`                                                     | `''`        | Classes CSS adicionais  |
| `variant`   | `'default' \| 'brand' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Tema do card            |

## Design System

Este componente utiliza as cores do design system unificado:

- **Brand**: Cores principais da marca (azul)
- **Success**: Verde para indicar sucesso
- **Warning**: Amarelo para avisos
- **Danger**: Vermelho para erros
- **Neutral**: Cinzas para conteúdo padrão

Todas as cores seguem a escala de 50 a 950 definida no `@repo/tailwind-config`.

## Exemplos

```tsx
// Card de estatísticas com tema da marca
<Card variant="brand" title="Estatísticas">
  <div className="text-center">
    <div className="text-3xl font-bold text-brand-600">1,234</div>
    <div className="text-sm text-neutral-600">Usuários Ativos</div>
  </div>
</Card>

// Card de notificação de sucesso
<Card variant="success" title="Operação Concluída">
  <p>Seus dados foram salvos com sucesso!</p>
</Card>

// Card de produto
<Card title="Produto" className="max-w-sm">
  <img src="produto.jpg" alt="Produto" className="w-full h-48 object-cover mb-4 rounded-xl" />
  <div className="flex justify-between items-center">
    <span className="text-2xl font-bold text-success-600">R$ 99,90</span>
    <button className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-xl transition-colors">
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

O componente inclui testes básicos de renderização usando Jest e Testing Library.

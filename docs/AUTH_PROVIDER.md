# AuthProvider - Clean Architecture Implementation

Este documento descreve a implementação do sistema de autenticação usando React Context, seguindo os princípios da Clean Architecture.

## Arquitetura

### 1. Domain Layer (`packages/api/src/domain/`)

**AuthService.ts** - Interface que define o contrato para serviços de autenticação:

```typescript
export interface AuthService {
  signIn(email: string, password: string): Promise<AuthUser>;
  signUp(
    email: string,
    password: string,
    displayName?: string
  ): Promise<AuthUser>;
  signOut(): Promise<void>;
  getCurrentUser(): AuthUser | null;
  getCurrentUserAsync(): Promise<AuthUser | null>;
  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void;
}
```

**AuthUser.ts** - Entidade que representa um usuário autenticado:

```typescript
export interface AuthUser {
  uid: string;
  email: string | null;
  displayName?: string | null;
}
```

### 2. Infrastructure Layer (`packages/api/src/infrastructure/`)

**FirebaseAuthService.ts** - Implementação concreta do AuthService usando Firebase:

- Implementa todos os métodos da interface AuthService
- Gerencia o estado de autenticação do Firebase
- Fornece método `onAuthStateChanged` para observar mudanças de estado

### 3. Application Layer (`packages/api/src/application/`)

**AuthUseCase.ts** - Casos de uso de autenticação que orquestram as operações:

- Delega operações para o AuthService
- Fornece uma camada de abstração entre a UI e a infraestrutura

### 4. UI Layer (`packages/ui/src/providers/`)

**AuthProvider.tsx** - Context Provider React que:

- Gerencia o estado global de autenticação
- Escuta mudanças de estado usando `onAuthStateChanged`
- Fornece métodos otimizados com `useCallback` e `useMemo`
- Expõe hook `useAuth()` para consumo nos componentes

**AuthGuard.tsx** - Componente de proteção de rotas que:

- Verifica se o usuário está autenticado
- Redireciona conforme necessário
- Suporta modo standalone para desenvolvimento
- Fornece fallback de loading

## Integração nos Apps

### Dashboard App (`apps/dashboard/`)

```tsx
// layout.tsx
export default function RootLayout({ children }) {
  const authService = getDefaultAuthService();

  return (
    <MantineProvider>
      <AuthProvider authService={authService}>
        <DashboardLayout>{children}</DashboardLayout>
      </AuthProvider>
    </MantineProvider>
  );
}

// DashboardLayout.tsx
export default function DashboardLayout({ children }) {
  const { signOut, isLoading } = useAuth();

  return (
    <AuthGuard enableStandaloneMode={true}>{/* Layout content */}</AuthGuard>
  );
}
```

### Root App (`apps/root/`)

```tsx
// layout.tsx - Similar ao dashboard mas sem standalone mode

// login/page.tsx & cadastro/page.tsx
const LoginForm = () => {
  const { signIn, isLoading } = useAuth();
  // Uso direto dos métodos do context
};

export default function LoginPage() {
  return (
    <PublicPageWrapper>
      <AuthLayout title="Login">
        <LoginForm />
      </AuthLayout>
    </PublicPageWrapper>
  );
}
```

## Benefícios da Implementação

### Clean Architecture

- **Separação de responsabilidades**: Cada camada tem uma responsabilidade específica
- **Inversão de dependências**: UI depende de abstrações, não de implementações
- **Testabilidade**: Interfaces facilitam mocking e testes unitários

### Performance

- **Otimização com React**: Uso de `useCallback`, `useMemo` e Context otimizado
- **Estado centralizado**: Evita re-renderizações desnecessárias
- **Lazy loading**: Context só é criado quando necessário

### Funcionalidades

- **Estado reativo**: Mudanças de autenticação são propagadas automaticamente
- **Suporte a standalone**: Modo de desenvolvimento sem autenticação
- **Proteção de rotas**: AuthGuard automático com redirecionamento
- **Loading states**: Estados de carregamento integrados

## Fluxo de Autenticação

1. **Inicialização**:
   - AuthProvider é montado no layout
   - `onAuthStateChanged` é registrado
   - Estado inicial é carregado

2. **Login/Cadastro**:
   - Componente usa `useAuth()` hook
   - Chama `signIn()` ou `signUp()`
   - Estado é atualizado automaticamente
   - Redirecionamento ocorre

3. **Proteção de Rotas**:
   - AuthGuard verifica estado
   - Redireciona se necessário
   - Suporta modo standalone

4. **Logout**:
   - `signOut()` limpa estado
   - Observer propaga mudança
   - Redirecionamento automático

## Migração do Código Antigo

### Antes (Antigo)

```tsx
// Cada componente precisava verificar auth manualmente
const checkAuth = async () => {
  const authUseCase = getDefaultAuthService();
  const user = await authUseCase.getCurrentUserAsync();
  if (!user) {
    window.location.href = '/login';
  }
};
```

### Depois (Novo)

```tsx
// Context gerencia tudo automaticamente
const { user, signOut } = useAuth();

// AuthGuard protege automaticamente
<AuthGuard>
  <ProtectedContent />
</AuthGuard>;
```

## Considerações de Segurança

- **Client-side only**: Esta implementação é para autenticação client-side
- **Token validation**: Firebase gerencia tokens automaticamente
- **State persistence**: Estado é mantido durante navegação
- **Logout completo**: `signOut()` limpa todo estado local

Esta implementação mantém os princípios da Clean Architecture enquanto fornece uma experiência de desenvolvimento moderna e performática com React Context.

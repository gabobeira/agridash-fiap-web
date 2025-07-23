import { useState } from 'react';
import { AuthUseCase } from '../application/AuthUseCase';

export function useSignIn(authUseCase?: AuthUseCase) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signIn(email: string, password: string) {
    if (!authUseCase) {
      setError('Auth service not available');
      return null;
    }

    setLoading(true);
    setError(null);
    try {
      const user = await authUseCase.signIn(email, password);
      return user;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao fazer login';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { signIn, loading, error };
}

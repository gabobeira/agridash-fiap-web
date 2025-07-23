import { useState } from 'react';
import { AuthUseCase } from '../application/AuthUseCase';

export function useSignUp(authUseCase?: AuthUseCase) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signUp(email: string, password: string, displayName?: string) {
    if (!authUseCase) {
      setError('Auth service not available');
      return null;
    }

    setLoading(true);
    setError(null);
    try {
      const user = await authUseCase.signUp(email, password, displayName);
      return user;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao cadastrar';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { signUp, loading, error };
}

import { useState } from 'react';
import { AuthUseCase } from '../application/AuthUseCase';

export function useSignOut(authUseCase: AuthUseCase) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signOut() {
    setLoading(true);
    setError(null);
    try {
      await authUseCase.signOut();
      return true;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao fazer logout';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { signOut, loading, error };
}

import { AuthUseCase } from '../application/AuthUseCase';
import { useState } from 'react';

export function useAuth(authUseCase?: AuthUseCase) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signIn(email: string, password: string) {
    if (!authUseCase) {
      setError('Serviço não disponível');
      return null;
    }

    setLoading(true);
    setError(null);
    try {
      const user = await authUseCase.signIn(email, password);
      return user;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    if (!authUseCase) {
      setError('Serviço não disponível');
      return false;
    }

    setLoading(true);
    setError(null);
    try {
      await authUseCase.signOut();
      return true;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function signUp(email: string, password: string, displayName?: string) {
    if (!authUseCase) {
      setError('Serviço não disponível');
      return null;
    }

    setLoading(true);
    setError(null);
    try {
      const user = await authUseCase.signUp(email, password, displayName);
      return user;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { signIn, signOut, signUp, loading, error };
}

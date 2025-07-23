import { useState } from 'react';
import { authUseCase } from './authService';

export function useSignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signUp(email: string, password: string, displayName?: string) {
    setLoading(true);
    setError(null);
    try {
      const user = await authUseCase.signUp(email, password, displayName);
      return user;
    } catch (err: any) {
      setError(err.message || 'Erro ao cadastrar');
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { signUp, loading, error };
}

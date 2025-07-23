import { useState } from 'react';
import { authUseCase } from './authService';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(email: string, password: string) {
    setLoading(true);
    setError(null);
    try {
      const user = await authUseCase.signIn(email, password);
      return user;
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { login, loading, error };
}

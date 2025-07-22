'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthPageTemplate } from '@/components/AuthPageTemplate';
import {
  Stack,
  Group,
  PasswordInput,
  Button,
  Anchor as Link,
  TextInput,
  Alert,
} from '@mantine/core';
import { authService } from '@/services/auth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authService.login(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      if (
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/wrong-password'
      ) {
        setError('Email ou senha inválidos');
      } else if (err.code === 'auth/invalid-email') {
        setError('Email inválido');
      } else {
        setError('Erro ao fazer login. Tente novamente.');
      }
      console.error('Erro no login:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="lg">
        {error && (
          <Alert color="red" title="Erro" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        <Stack gap="md">
          <TextInput
            label="Email"
            placeholder="Digite seu email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <PasswordInput
            label="Senha"
            placeholder="Digite sua senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </Stack>
        <Button type="submit" loading={loading} fullWidth>
          Entrar
        </Button>
      </Stack>
    </form>
  );
};

export default function LoginPage() {
  return (
    <AuthPageTemplate
      title="Preencha suas credenciais"
      content={<LoginForm />}
      footer={
        <Group justify="center">
          <Link href="/cadastro" fz="sm" c="blue.6">
            Não tem uma conta? Cadastre-se
          </Link>
        </Group>
      }
    />
  );
}

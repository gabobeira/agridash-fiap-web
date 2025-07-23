'use client';

import { AuthLayout } from '@/components/AuthLayout';
import { PublicPageWrapper } from '@/components/PublicPageWrapper';
import {
  Anchor,
  Button,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useAuth } from '@repo/ui';
import { useState } from 'react';

const LoginForm = () => {
  const { signIn, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      await signIn(email, password);
      window.location.href = '/dashboard';
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao fazer login';
      setError(errorMessage);
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Stack gap="lg">
        <Stack gap="md">
          <TextInput
            label="Email"
            placeholder="Digite seu email"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <PasswordInput
            label="Senha"
            placeholder="Digite sua senha"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Stack>
        {error ? (
          <Text c="red" fz="sm">
            {error}
          </Text>
        ) : null}
        <Button
          fullWidth
          type="submit"
          loading={isLoading}
          disabled={isLoading}
        >
          Entrar
        </Button>
      </Stack>
    </form>
  );
};

export default function LoginPage() {
  return (
    <PublicPageWrapper>
      <AuthLayout
        title="Login"
        footer={
          <Group justify="center">
            <Anchor href="/cadastro" fz="sm" c="blue.6">
              Não tem uma conta? Cadastre-se
            </Anchor>
          </Group>
        }
      >
        <LoginForm />
      </AuthLayout>
    </PublicPageWrapper>
  );
}

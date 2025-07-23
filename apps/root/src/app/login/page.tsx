'use client';

import { AuthLayout } from '@/components/AuthLayout';
import { useLogin } from '@/services/useLogin';
import {
  Anchor,
  Button,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useState } from 'react';

const LoginForm = () => {
  const { login, loading, error } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const user = await login(email, password);

    if (user) {
      window.location.href = '/dashboard';
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
        <Button fullWidth type="submit" loading={loading} disabled={loading}>
          Entrar
        </Button>
      </Stack>
    </form>
  );
};

export default function LoginPage() {
  return (
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
  );
}

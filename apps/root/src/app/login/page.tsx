'use client';

import { AuthLayout } from '@/components/AuthLayout';
import { useAuthStore } from '@agridash/api';
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
  const { signIn, loading, error } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await signIn(email, password);
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

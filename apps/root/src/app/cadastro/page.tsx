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

const CadastroForm = () => {
  const { signUp, isLoading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(false);
    setError(null);

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      await signUp(email, password, name);
      setSuccess(true);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao criar conta';
      setError(errorMessage);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="lg">
        <Stack gap="md">
          <TextInput
            label="Nome"
            placeholder="Digite seu nome completo"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
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
          <PasswordInput
            label="Confirmar Senha"
            placeholder="Confirme sua senha"
            required
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </Stack>
        {error && (
          <Text c="red" fz="sm">
            {error}
          </Text>
        )}
        {success && (
          <Text c="green" fz="sm">
            Cadastro realizado!
          </Text>
        )}
        <Button
          fullWidth
          type="submit"
          loading={isLoading}
          disabled={isLoading}
        >
          Cadastrar
        </Button>
      </Stack>
    </form>
  );
};

export default function CadastroPage() {
  return (
    <PublicPageWrapper>
      <AuthLayout
        title="Cadastro"
        footer={
          <Group justify="center">
            <Anchor href="/login" fz="sm" c="blue.6">
              Já tem uma conta? Faça login
            </Anchor>
          </Group>
        }
      >
        <CadastroForm />
      </AuthLayout>
    </PublicPageWrapper>
  );
}

'use client';
import { AuthLayout } from '@/components/AuthLayout';
import { getDefaultAuthService, useSignUp } from '@agridash/api';
import {
  Anchor,
  Button,
  Group,
  PasswordInput,
  Stack,
  TextInput,
} from '@mantine/core';
import { useState } from 'react';

const CadastroForm = () => {
  const authUseCase = getDefaultAuthService();
  const { signUp, loading, error } = useSignUp(authUseCase);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(false);
    if (password !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }
    const user = await signUp(email, password, name);
    if (user) setSuccess(true);
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
        {error && <span style={{ color: 'red' }}>{error}</span>}
        {success && <span style={{ color: 'green' }}>Cadastro realizado!</span>}
        <Button fullWidth type="submit" loading={loading} disabled={loading}>
          Cadastrar
        </Button>
      </Stack>
    </form>
  );
};

export default function CadastroPage() {
  return (
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
  );
}

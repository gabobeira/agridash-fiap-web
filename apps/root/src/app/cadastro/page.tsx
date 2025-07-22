'use client';
import { AuthPageTemplate } from '@/components/AuthPageTemplate';
import {
  Anchor,
  Button,
  Group,
  PasswordInput,
  Stack,
  TextInput,
} from '@mantine/core';

const CadastroForm = () => (
  <form>
    <Stack gap="lg">
      <Stack gap="md">
        <TextInput
          label="Nome"
          placeholder="Digite seu nome completo"
          required
        />
        <TextInput
          label="Email"
          placeholder="Digite seu email"
          type="email"
          required
        />
        <PasswordInput label="Senha" placeholder="Digite sua senha" required />
        <PasswordInput
          label="Confirmar Senha"
          placeholder="Confirme sua senha"
          required
        />
      </Stack>
      <Button fullWidth>Cadastrar</Button>
    </Stack>
  </form>
);

export default function CadastroPage() {
  return (
    <AuthPageTemplate
      title="Cadastro"
      content={<CadastroForm />}
      footer={
        <Group justify="center">
          <Anchor href="/login" fz="sm" c="blue.6">
            Já tem uma conta? Faça login
          </Anchor>
        </Group>
      }
    />
  );
}

'use client';
import { AuthPageTemplate } from '@/components/AuthPageTemplate';
import {
  Stack,
  Group,
  PasswordInput,
  Button,
  Anchor as Link,
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
      title="Cadastre-se"
      content={<CadastroForm />}
      footer={
        <Group justify="center">
          <Link href="/login" fz="sm" c="blue.6">
            Já tem uma conta? Faça login
          </Link>
        </Group>
      }
    />
  );
}

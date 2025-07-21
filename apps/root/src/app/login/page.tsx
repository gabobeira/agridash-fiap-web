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

const LoginForm = () => (
  <form>
    <Stack gap="lg">
      <Stack gap="md">
        <TextInput
          label="Email"
          placeholder="Digite seu email"
          type="email"
          required
        />
        <PasswordInput label="Senha" placeholder="Digite sua senha" required />
      </Stack>
      <Button fullWidth>Entrar</Button>
    </Stack>
  </form>
);

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

'use client';

import { Stack, Container, Group } from '@mantine/core';
import { FTitle, FInput, FPasswordInput, FButton, FLink } from '@repo/ui';

export default function LoginPage() {
  return (
    <Container size="xs" py="xl">
      <Stack gap="lg">
        <FTitle order={1} ta="center">
          Login
        </FTitle>

        <form>
          <Stack gap="md">
            <FInput
              label="Email"
              placeholder="Digite seu email"
              type="email"
              required
            />

            <FPasswordInput
              label="Senha"
              placeholder="Digite sua senha"
              required
            />

            <FButton fullWidth>Entrar</FButton>
          </Stack>
        </form>

        <Group justify="center">
          <FLink href="/cadastro">Não tem uma conta? Cadastre-se</FLink>
        </Group>
      </Stack>
    </Container>
  );
}

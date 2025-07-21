'use client';

import { Stack, Container, Group } from '@mantine/core';
import { FTitle, FInput, FPasswordInput, FButton, FLink } from '@repo/ui';

export default function CadastroPage() {
  return (
    <Container size="xs" py="xl">
      <Stack gap="lg">
        <FTitle order={1} ta="center">
          Cadastro
        </FTitle>

        <form>
          <Stack gap="md">
            <FInput
              label="Nome"
              placeholder="Digite seu nome completo"
              required
            />

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

            <FPasswordInput
              label="Confirmar Senha"
              placeholder="Confirme sua senha"
              required
            />

            <FButton fullWidth>Cadastrar</FButton>
          </Stack>
        </form>

        <Group justify="center">
          <FLink href="/login">Já tem uma conta? Faça login</FLink>
        </Group>
      </Stack>
    </Container>
  );
}

import { FButton, FCard, FTitle, FText, FLink } from '@repo/ui';
import { Container, Stack, Group, Center, Grid, GridCol } from '@mantine/core';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-success-900">
      <Container size="xl" py="xl">
        {/* Header */}
        <Center mb="xl">
          <Stack align="center" gap="md">
            <div className="w-20 h-20 bg-gradient-to-br from-fiap-500 to-fiap-700 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-12 h-12 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
              </svg>
            </div>
            <FTitle order={1} size="3rem" ta="center" c="fiap.5">
              FIAP Farms
            </FTitle>
            <FTitle order={2} size="1.5rem" ta="center" c="white" fw={400}>
              Cooperativa de Fazendas
            </FTitle>
            <FText size="xl" ta="center" c="dimmed" maw={600}>
              Solução estratégica para gestão de vendas e planejamento assertivo
              dos alimentos com maior lucro para os integrantes da cooperativa.
            </FText>
          </Stack>
        </Center>

        {/* Authentication Section */}
        <Center mb="xl">
          <Group gap="md">
            <FLink href="/login">
              <FButton
                variant="outline"
                size="lg"
                c="white"
                style={{ borderColor: 'var(--mantine-color-fiap-4)' }}
              >
                Fazer Login
              </FButton>
            </FLink>
            <FLink href="/cadastro">
              <FButton
                size="lg"
                color="fiap"
                style={{
                  background:
                    'linear-gradient(135deg, var(--mantine-color-fiap-6) 0%, var(--mantine-color-fiap-4) 100%)',
                  boxShadow: '0 4px 15px rgba(237, 20, 91, 0.3)',
                }}
              >
                Cadastrar-se
              </FButton>
            </FLink>
          </Group>
        </Center>

        {/* Features Section */}
        <Grid mb="xl" gutter="xl">
          <GridCol span={{ base: 12, md: 4 }}>
            <FCard
              padding="xl"
              withBorder
              h="100%"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Stack align="center" gap="md">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-400 to-brand-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" />
                  </svg>
                </div>
                <FTitle order={3} ta="center" c="white">
                  Análise de Vendas
                </FTitle>
                <FText ta="center" c="dimmed">
                  Análise estratégica das vendas com relatórios detalhados,
                  identificação de produtos mais lucrativos e tendências de
                  mercado.
                </FText>
                <FButton variant="light" color="brand" disabled>
                  Em Breve
                </FButton>
              </Stack>
            </FCard>
          </GridCol>

          <GridCol span={{ base: 12, md: 4 }}>
            <FCard
              padding="xl"
              withBorder
              h="100%"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Stack align="center" gap="md">
                <div className="w-16 h-16 bg-gradient-to-br from-warning-400 to-warning-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 18H17V16H7V18Z" />
                    <path d="M7 14H17V12H7V14Z" />
                  </svg>
                </div>
                <FTitle order={3} ta="center" c="white">
                  Gestão de Transações
                </FTitle>
                <FText ta="center" c="dimmed">
                  Controle completo de todas as transações financeiras,
                  incluindo vendas, compras e fluxo de caixa da cooperativa.
                </FText>
                <FButton variant="light" color="warning" disabled>
                  Em Breve
                </FButton>
              </Stack>
            </FCard>
          </GridCol>

          <GridCol span={{ base: 12, md: 4 }}>
            <FCard
              padding="xl"
              withBorder
              h="100%"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Stack align="center" gap="md">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-400 to-violet-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z" />
                  </svg>
                </div>
                <FTitle order={3} ta="center" c="white">
                  Controle de Estoque
                </FTitle>
                <FText ta="center" c="dimmed">
                  Gerenciamento inteligente do estoque com alertas automáticos,
                  controle de validade e otimização de armazenamento.
                </FText>
                <FButton variant="light" color="violet" disabled>
                  Em Breve
                </FButton>
              </Stack>
            </FCard>
          </GridCol>
        </Grid>

        {/* Additional Features */}
        <Grid gutter="xl">
          <GridCol span={{ base: 12, md: 6 }}>
            <FCard
              padding="xl"
              withBorder
              h="100%"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Stack gap="md">
                <Group>
                  <div className="w-12 h-12 bg-gradient-to-br from-danger-400 to-danger-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 19V20H3V19L5 17V11C5 7.9 7.03 5.17 10 4.29C10 4.19 10 4.1 10 4C10 2.9 10.9 2 12 2S14 2.9 14 4C14 4.1 14 4.19 14 4.29C16.97 5.17 19 7.9 19 11V17L21 19ZM14 21C14 22.1 13.1 23 12 23S10 22.1 10 21" />
                    </svg>
                  </div>
                  <div>
                    <FTitle order={3} c="white">
                      Sistema de Notificações
                    </FTitle>
                    <FText c="dimmed">
                      Alertas inteligentes sobre oportunidades de vendas,
                      produtos próximos do vencimento e análises de mercado.
                    </FText>
                  </div>
                </Group>
                <FButton variant="light" color="danger" disabled>
                  Em Breve
                </FButton>
              </Stack>
            </FCard>
          </GridCol>

          <GridCol span={{ base: 12, md: 6 }}>
            <FCard
              padding="xl"
              withBorder
              h="100%"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Stack gap="md">
                <Group>
                  <div className="w-12 h-12 bg-gradient-to-br from-success-400 to-success-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17 10.5V7C17 4.24 14.76 2 12 2S7 4.24 7 7V10.5C6.45 10.5 6 10.95 6 11.5V17.5C6 18.05 6.45 18.5 7 18.5H17C17.55 18.5 18 18.05 18 17.5V11.5C18 10.95 17.55 10.5 17 10.5M15.5 10.5H8.5V7C8.5 5.07 10.07 3.5 12 3.5S15.5 5.07 15.5 7V10.5Z" />
                    </svg>
                  </div>
                  <div>
                    <FTitle order={3} c="white">
                      Plataforma Cross-Platform
                    </FTitle>
                    <FText c="dimmed">
                      Acesso completo via web desktop e aplicativo mobile,
                      garantindo produtividade em qualquer lugar.
                    </FText>
                  </div>
                </Group>
                <FButton variant="light" color="success" disabled>
                  Em Breve
                </FButton>
              </Stack>
            </FCard>
          </GridCol>
        </Grid>

        {/* Footer */}
        <Center mt="xl" pt="xl">
          <Stack align="center" gap="sm">
            <FText size="sm" c="dimmed" ta="center">
              © 2025 FIAP Farms - Cooperativa de Fazendas
            </FText>
            <FText size="xs" c="dimmed" ta="center" opacity={0.7}>
              Solução desenvolvida para otimizar a gestão estratégica da
              cooperativa
            </FText>
          </Stack>
        </Center>
      </Container>
    </div>
  );
}

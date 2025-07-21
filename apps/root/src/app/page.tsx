import {
  Container,
  Stack,
  Group,
  Center,
  Grid,
  GridCol,
  Title,
  Text,
  Button,
  Anchor as Link,
} from '@mantine/core';
import { HomeCard } from '@/components/HomeCard';
import {
  IconSales,
  IconTransactions,
  IconStock,
  IconNotifications,
  IconCrossPlatform,
} from '@/assets/icons';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-green-900 flex flex-col">
      <div className="flex-1 flex items-center">
        <Container size="xl" py="xl">
          <Center mb="xl">
            <Stack align="center" gap="md">
              <Title
                order={1}
                size="3.5rem"
                ta="center"
                fw={800}
                style={{
                  background:
                    'linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #3b82f6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                AgriDash
              </Title>
              <Title order={2} size="1.5rem" ta="center" c="white" fw={400}>
                Sistema de gestão de Cooperativas Agrícolas
              </Title>
              <Text size="xl" ta="center" c="dimmed" maw={600}>
                Solução estratégica para gestão de vendas e planejamento
                assertivo dos alimentos com maior lucro para os integrantes da
                cooperativa.
              </Text>
            </Stack>
          </Center>

          <Center mb="xl">
            <Group gap="md">
              <Link href="/login">
                <Button
                  size="lg"
                  color="green"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--mantine-color-green-6) 0%, var(--mantine-color-green-9) 100%)',
                    boxShadow: '0 2px 15px rgba(34, 197, 94, 0.3)',
                  }}
                >
                  Acesse sua conta
                </Button>
              </Link>
            </Group>
          </Center>

          {/* Features Section */}
          <Grid mb="xl" gutter="md">
            <GridCol span={{ base: 12, sm: 6, md: 4, lg: 2.4 }}>
              <HomeCard
                icon={<IconSales />}
                title="Análise de Vendas"
                description="Análise estratégica das vendas com relatórios detalhados e tendências de mercado."
              />
            </GridCol>

            <GridCol span={{ base: 12, sm: 6, md: 4, lg: 2.4 }}>
              <HomeCard
                icon={<IconTransactions />}
                title="Gestão de Transações"
                description="Controle completo de todas as transações financeiras da cooperativa."
              />
            </GridCol>

            <GridCol span={{ base: 12, sm: 6, md: 4, lg: 2.4 }}>
              <HomeCard
                icon={<IconStock />}
                title="Controle de Estoque"
                description="Gerenciamento inteligente do estoque com alertas automáticos."
              />
            </GridCol>

            <GridCol span={{ base: 12, sm: 6, md: 4, lg: 2.4 }}>
              <HomeCard
                icon={<IconNotifications />}
                title="Sistema de Notificações"
                description="Alertas inteligentes sobre oportunidades de vendas."
              />
            </GridCol>

            <GridCol span={{ base: 12, sm: 6, md: 4, lg: 2.4 }}>
              <HomeCard
                icon={<IconCrossPlatform />}
                title="Integração Multicanal"
                description="Conecte-se com diversos canais de venda e amplie seu alcance."
              />
            </GridCol>
          </Grid>
        </Container>
      </div>

      <footer className="mt-auto">
        <Container size="xl">
          <Center py="xl">
            <Stack align="center" gap="sm">
              <Text size="sm" c="dimmed" ta="center">
                © 2025 FIAP Farms - Cooperativa de Fazendas
              </Text>
              <Text size="xs" c="dimmed" ta="center" opacity={0.7}>
                Solução desenvolvida para otimizar a gestão estratégica da
                cooperativa
              </Text>
            </Stack>
          </Center>
        </Container>
      </footer>
    </div>
  );
}

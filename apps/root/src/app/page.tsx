import {
  Button,
  Center,
  Container,
  Group,
  Anchor as Link,
  Stack,
  Text,
  Title,
} from '@mantine/core';

export default function Home() {
  return (
    <Container size="xl" py="xl">
      <Center mb="xl">
        <Stack align="center" gap="md">
          <Title
            order={1}
            size="4.5rem"
            ta="center"
            fw={800}
            style={{
              background:
                'linear-gradient(135deg, var(--mantine-color-success-6) 0%, var(--mantine-color-blue-6) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            AgriDash
          </Title>
          <Title order={2} size="1.5rem" ta="center" c="neutral.6" fw={500}>
            Sistema de gestão de Cooperativas Agrícolas
          </Title>
          <Text size="xl" ta="center" c="dimmed" maw={600}>
            Solução estratégica para gestão de vendas e planejamento assertivo
            dos alimentos com maior lucro para os integrantes da cooperativa.
          </Text>
        </Stack>
      </Center>

      <Center mb="xl">
        <Group gap="md">
          <Link href="/login">
            <Button size="lg">Acesse sua conta</Button>
          </Link>
        </Group>
      </Center>

      {/* <Grid mb="xl" gutter="md">
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
      </Grid> */}
    </Container>
  );
}

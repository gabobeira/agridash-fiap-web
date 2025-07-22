'use client';

import { useEffect, useState } from 'react';
import {
  Container,
  Title,
  Grid,
  Card,
  Text,
  Button,
  Stack,
  Group,
  Modal,
  TextInput,
  NumberInput,
  Select,
  Alert,
} from '@mantine/core';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth';
import {
  cooperadosService,
  produtosService,
  estoqueService,
  vendasService,
} from '@/services/firebase';
import { Cooperado, Produto, Estoque, Venda } from '@/types';
import { useDisclosure } from '@mantine/hooks';

export default function DashboardPage() {
  const router = useRouter();
  const [cooperados, setCooperados] = useState<Cooperado[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [estoque, setEstoque] = useState<Estoque[]>([]);
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [selectedCooperado, setSelectedCooperado] = useState<number | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  // Modal de vendas
  const [novaVendaAberta, { open, close: fecharNovaVenda }] =
    useDisclosure(false);

  // Função para abrir o modal após carregar os dados
  const abrirNovaVenda = async () => {
    setIsLoading(true);
    try {
      const [produtosData, estoqueData] = await Promise.all([
        produtosService.getProdutos(),
        estoqueService.getEstoque(),
      ]);
      setProdutos(produtosData);
      setEstoque(estoqueData);
      open();
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setError('Erro ao carregar dados. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Estado do formulário de venda
  const [isLoading, setIsLoading] = useState(false);
  const [novaVenda, setNovaVenda] = useState<Omit<Venda, 'UID' | 'data'>>({
    produto: '',
    quantidade: 0,
    valor: 0,
    cooperado: '',
  });

  useEffect(() => {
    // Verificar autenticação
    const user = authService.getCurrentUser();
    if (!user) {
      router.push('/login');
      return;
    }

    // Carregar dados iniciais
    carregarDados();

    // Observar mudanças em vendas e estoque em tempo real
    const unsubscribeVendas = vendasService.onVendasChange(novasVendas => {
      setVendas(novasVendas);
    });

    // Re-carregar produtos e estoque a cada 10 segundos para manter números atualizados
    const interval = setInterval(async () => {
      try {
        const [produtosData, estoqueData] = await Promise.all([
          produtosService.getProdutos(),
          estoqueService.getEstoque(),
        ]);
        setProdutos(produtosData);
        setEstoque(estoqueData);
      } catch (error) {
        console.error('Erro ao atualizar dados:', error);
      }
    }, 10000);

    return () => {
      unsubscribeVendas();
      clearInterval(interval);
    };
  }, []);

  const carregarDados = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [cooperadosData, produtosData, estoqueData, vendasData] =
        await Promise.all([
          cooperadosService.getCooperados(),
          produtosService.getProdutos(),
          estoqueService.getEstoque(),
          vendasService.getVendas(),
        ]);

      // Log dos dados para debug
      console.log('Dados carregados:', {
        cooperados: cooperadosData,
        produtos: produtosData,
        estoque: estoqueData,
        vendas: vendasData,
      });

      console.log('Dados dos produtos:', produtosData);

      console.log('Dados do estoque:', estoqueData);

      if (cooperadosData?.length) setCooperados(cooperadosData);
      if (produtosData?.length) setProdutos(produtosData);
      if (estoqueData?.length) setEstoque(estoqueData);
      if (vendasData?.length) setVendas(vendasData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setError('Erro ao carregar dados. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      router.push('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      setError('Erro ao fazer logout. Tente novamente.');
    }
  };

  const handleAdicionarVenda = async () => {
    try {
      if (
        !novaVenda.produto ||
        !novaVenda.cooperado ||
        novaVenda.quantidade <= 0
      ) {
        throw new Error('Preencha todos os campos corretamente');
      }

      const produto = produtos.find(p => p.nome_produto === novaVenda.produto);
      if (!produto) throw new Error('Produto não encontrado');

      const estoqueAtual = estoque.find(
        e => e.id_produto === produto.id_produto
      );
      if (!estoqueAtual) throw new Error('Produto sem estoque cadastrado');

      if (novaVenda.quantidade > estoqueAtual.quantidade_estoque) {
        throw new Error('Quantidade maior que o estoque disponível');
      }

      const cooperado = cooperados.find(c => c.nome === novaVenda.cooperado);
      if (!cooperado) throw new Error('Cooperado não encontrado');

      // Preparar dados da venda
      const venda = {
        ...novaVenda,
        data: new Date(),
        id_produto: produto.id_produto,
        id_cooperado: cooperado.id_cooperado,
      };

      await vendasService.adicionarVenda(
        venda,
        produto.id_produto,
        estoqueAtual.quantidade_estoque
      );

      // Recarregar dados
      await carregarDados();

      // Fechar modal e limpar form
      fecharNovaVenda();
      setNovaVenda({
        produto: '',
        quantidade: 0,
        valor: 0,
        cooperado: '',
      });
    } catch (error: any) {
      console.error('Erro ao adicionar venda:', error);
      setError(error.message || 'Erro ao adicionar venda. Tente novamente.');
    }
  };

  // Função para recarregar dados antes de abrir o modal
  const handleAbrirModal = async () => {
    setIsLoading(true);
    try {
      await carregarDados();
      abrirNovaVenda();
    } catch (error) {
      setError('Erro ao carregar dados. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size="xl" py="xl">
      <Group justify="space-between" mb="xl">
        <Title>Dashboard</Title>
        <Button onClick={handleLogout} color="red">
          Sair
        </Button>
      </Group>

      {error && (
        <Alert color="red" title="Erro" mb="xl">
          {error}
        </Alert>
      )}

      <Grid>
        {/* Resumo */}
        <Grid.Col span={3}>
          <Card withBorder>
            <Text size="lg" fw={500}>
              Cooperados
            </Text>
            <Text size="xl">{cooperados.length}</Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={3}>
          <Card withBorder>
            <Text size="lg" fw={500}>
              Produtos
            </Text>
            <Text size="xl">{produtos.length}</Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={3}>
          <Card withBorder>
            <Text size="lg" fw={500}>
              Vendas
            </Text>
            <Text size="xl">{vendas.length}</Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={3}>
          <Card withBorder>
            <Text size="lg" fw={500}>
              Estoque Total
            </Text>
            <Text size="xl">
              {estoque.reduce((acc, item) => acc + item.quantidade_estoque, 0)}
            </Text>
          </Card>
        </Grid.Col>

        {/* Ações */}
        <Grid.Col span={12}>
          <Group>
            <Button onClick={handleAbrirModal} color="green">
              Registrar Venda
            </Button>
          </Group>
        </Grid.Col>

        {/* Lista de Produtos */}
        <Grid.Col span={6}>
          <Card withBorder>
            <Title order={3} mb="md">
              Produtos
            </Title>
            <Stack>
              {produtos.map(produto => (
                <Card key={produto.id_produto} withBorder>
                  <Text fw={500}>{produto.nome_produto}</Text>
                  <Text>Custo: R$ {produto.valor_unitario_producao}</Text>
                  <Text>Preço de Venda: R$ {produto.valor_unitario_venda}</Text>
                  <Text>Unidade: {produto.unidade_medida}</Text>
                </Card>
              ))}
            </Stack>
          </Card>
        </Grid.Col>

        {/* Lista de Vendas */}
        <Grid.Col span={6}>
          <Card withBorder>
            <Title order={3} mb="md">
              Últimas Vendas
            </Title>
            <Stack>
              {vendas.slice(0, 5).map(venda => (
                <Card key={venda.UID} withBorder>
                  <Text fw={500}>{venda.produto}</Text>
                  <Text>Cooperado: {venda.cooperado}</Text>
                  <Text>Quantidade: {venda.quantidade}</Text>
                  <Text>Valor: R$ {venda.valor}</Text>
                  <Text>
                    Data:{' '}
                    {venda.data instanceof Date
                      ? venda.data.toLocaleDateString()
                      : venda.data}
                  </Text>
                </Card>
              ))}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Modais */}
      {/* Modal de Nova Venda */}
      <Modal
        opened={novaVendaAberta}
        onClose={fecharNovaVenda}
        title="Registrar Venda"
        size="lg"
      >
        {isLoading ? (
          <Stack align="center" py="xl">
            <Text>Carregando...</Text>
          </Stack>
        ) : (
          <>
            {(!produtos || produtos.length === 0) && (
              <Alert color="yellow" mb="md">
                Nenhum produto disponível
              </Alert>
            )}
            <Stack>
              <Select
                label="Produto"
                placeholder="Selecione um produto"
                searchable
                clearable
                data={(produtos ?? [])?.map(p => {
                  const estoqueItem = estoque?.find(
                    e => e.id_produto === p.id_produto
                  );
                  const quantidade = estoqueItem?.quantidade_estoque || 0;
                  return {
                    value: p.nome_produto,
                    label: `${p.nome_produto} - ${quantidade} ${p.unidade_medida} - R$ ${p.valor_unitario_venda}/${p.unidade_medida}`,
                    group: 'Produtos',
                    disabled: quantidade <= 0,
                  };
                })}
                value={novaVenda.produto}
                onChange={value => {
                  if (!value) return;
                  const produto = produtos.find(p => p.nome_produto === value);
                  if (produto) {
                    setNovaVenda({
                      ...novaVenda,
                      produto: value,
                      valor:
                        produto.valor_unitario_venda *
                        (novaVenda.quantidade || 0),
                    });
                  }
                }}
              />
              {novaVenda.produto && (
                <>
                  <Text size="sm" color="dimmed">
                    Estoque disponível:{' '}
                    {estoque.find(e => {
                      const produtoSelecionado = produtos.find(
                        p => p.nome_produto === novaVenda.produto
                      );
                      return e.id_produto === produtoSelecionado?.id_produto;
                    })?.quantidade_estoque || 0}{' '}
                    {
                      produtos.find(p => p.nome_produto === novaVenda.produto)
                        ?.unidade_medida
                    }
                  </Text>
                  <NumberInput
                    label="Quantidade"
                    value={novaVenda.quantidade}
                    onChange={value => {
                      const quantidade = typeof value === 'number' ? value : 0;
                      const produto = produtos.find(
                        p => p.nome_produto === novaVenda.produto
                      );
                      if (produto) {
                        setNovaVenda({
                          ...novaVenda,
                          quantidade,
                          valor: produto.valor_unitario_venda * quantidade,
                        });
                      }
                    }}
                    min={0}
                    max={
                      estoque.find(e => {
                        const produtoSelecionado = produtos.find(
                          p => p.nome_produto === novaVenda.produto
                        );
                        return e.id_produto === produtoSelecionado?.id_produto;
                      })?.quantidade_estoque || 0
                    }
                  />
                  <Text fw={500}>
                    Valor Total: R$ {novaVenda.valor.toFixed(2)}
                  </Text>
                </>
              )}
              <Select
                label="Cooperado"
                placeholder="Selecione um cooperado"
                searchable
                clearable
                data={(cooperados || []).map(c => ({
                  value: c.nome,
                  label: c.nome,
                  group: 'Cooperados',
                }))}
                value={novaVenda.cooperado}
                onChange={value => {
                  if (!value) return;
                  setNovaVenda({ ...novaVenda, cooperado: value });
                }}
              />
              <Button
                onClick={handleAdicionarVenda}
                disabled={
                  !novaVenda.produto ||
                  !novaVenda.cooperado ||
                  novaVenda.quantidade <= 0
                }
              >
                Registrar Venda
              </Button>
            </Stack>
          </>
        )}
      </Modal>
    </Container>
  );
}

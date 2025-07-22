import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Cooperado, Produto, Estoque, Venda } from '../types';

// Serviço somente leitura para cooperados
export const cooperadosService = {
  async getCooperados(): Promise<Cooperado[]> {
    const querySnapshot = await getDocs(collection(db, 'cooperados'));
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id_cooperado: data.id_cooperado,
        nome: data.nome,
      } as Cooperado;
    });
  },
};

// Serviço somente leitura para produtos
export const produtosService = {
  async getProdutos(): Promise<Produto[]> {
    const querySnapshot = await getDocs(collection(db, 'estoque'));
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id_produto: data.id_produto,
        nome_produto: data.nome_produto,
        unidade_medida: data.unidade_medida,
        valor_unitario_producao: data.valor_unitario_producao,
        valor_unitario_venda: data.valor_unitario_venda,
      } as Produto;
    });
  },

  async getProdutoByNome(nome: string): Promise<Produto | null> {
    const q = query(
      collection(db, 'produtos'),
      where('nome_produto', '==', nome)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    const data = querySnapshot.docs[0].data();
    return {
      id_produto: data.id_produto,
      nome_produto: data.nome_produto,
      unidade_medida: data.unidade_medida,
      valor_unitario_producao: data.valor_unitario_producao,
      valor_unitario_venda: data.valor_unitario_venda,
    } as Produto;
  },
};

// Serviço para gerenciamento de estoque (leitura e atualização apenas via vendas)
export const estoqueService = {
  async getEstoque(): Promise<Estoque[]> {
    const querySnapshot = await getDocs(collection(db, 'estoque'));
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id_produto: data.id_produto,
        capacidade_estoque: data.capacidade_estoque,
        quantidade_estoque: data.quantidade_estoque,
        status_estoque: data.status_estoque,
      } as Estoque;
    });
  },

  async getEstoquePorProduto(produtoId: number): Promise<Estoque | null> {
    const q = query(
      collection(db, 'estoque'),
      where('id_produto', '==', produtoId)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    const data = querySnapshot.docs[0].data();
    return {
      id_cooperado: data.id_cooperado,
      id_produto: data.id_produto,
      capacidade_estoque: data.capacidade_estoque,
      quantidade_estoque: data.quantidade_estoque,
      status_estoque: data.status_estoque,
    } as Estoque;
  },

  // Função interna para atualização de estoque após venda
  async _atualizarEstoqueAposVenda(
    id_produto: number,
    novaQuantidade: number
  ): Promise<void> {
    const q = query(
      collection(db, 'estoque'),
      where('id_produto', '==', id_produto)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docRef = doc(db, 'estoque', querySnapshot.docs[0].id);
      const data = querySnapshot.docs[0].data();
      await updateDoc(docRef, {
        quantidade_estoque: novaQuantidade,
        status_estoque: calcularStatusEstoque(
          novaQuantidade,
          data.capacidade_estoque
        ),
      });
    }
  },
};

// Função auxiliar para calcular o status do estoque
const calcularStatusEstoque = (
  quantidade: number,
  capacidade: number
): 'baixo' | 'médio' | 'alto' => {
  const percentual = (quantidade / capacidade) * 100;
  if (percentual <= 30) return 'baixo';
  if (percentual <= 70) return 'médio';
  return 'alto';
};

export const vendasService = {
  async getVendas(): Promise<Venda[]> {
    const q = query(collection(db, 'vendas'), orderBy('data', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        UID: doc.id,
        cooperado: data.cooperado,
        data: data.data.toDate().toLocaleString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          timeZoneName: 'short',
        }),
        produto: data.produto,
        quantidade: data.quantidade,
        valor: data.valor,
      } as Venda;
    });
  },

  async adicionarVenda(
    venda: Omit<Venda, 'UID'>,
    produtoId: number,
    estoqueAtual: number
  ): Promise<void> {
    if (venda.quantidade <= 0) {
      throw new Error('Quantidade deve ser maior que zero');
    }

    if (venda.quantidade > estoqueAtual) {
      throw new Error('Quantidade maior que o estoque disponível');
    }

    // Primeiro adiciona a venda
    await addDoc(collection(db, 'vendas'), {
      ...venda,
      data: new Date(), // Salva como Timestamp no Firestore
    });

    // Depois atualiza o estoque
    await estoqueService._atualizarEstoqueAposVenda(
      produtoId,
      estoqueAtual - venda.quantidade
    );
  },

  onVendasChange(callback: (vendas: Venda[]) => void) {
    const q = query(collection(db, 'vendas'), orderBy('data', 'desc'));
    return onSnapshot(q, querySnapshot => {
      const vendas = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          UID: doc.id,
          cooperado: data.cooperado,
          data: data.data.toDate().toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short',
          }),
          produto: data.produto,
          quantidade: data.quantidade,
          valor: data.valor,
        } as Venda;
      });
      callback(vendas);
    });
  },
};

export interface User {
  uid: string;
  email: string;
}

export interface Cooperado {
  id_cooperado: number;
  nome: string;
}

export interface Produto {
  id_produto: number;
  nome_produto: string;
  unidade_medida: string;
  valor_unitario_producao: number;
  valor_unitario_venda: number;
}

export interface Estoque {
  id_produto: number;
  capacidade_estoque: number;
  quantidade_estoque: number;
  status_estoque: string;
}

export interface Venda {
  UID: string;
  cooperado: string;
  data: string | Date; // Aceita tanto string formatada quanto objeto Date
  produto: string;
  quantidade: number;
  valor: number;
}

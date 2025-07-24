export interface ISale {
  cooperado: string;
  data: Date;
  produto: string;
  quantidadeProduto: number;
  valorVenda: number;
}

export class Sale implements ISale {
  cooperado: string;
  data: Date;
  produto: string;
  quantidadeProduto: number;
  valorVenda: number;

  constructor(data: ISale) {
    this.cooperado = data.cooperado;
    this.data = data.data;
    this.produto = data.produto;
    this.quantidadeProduto = data.quantidadeProduto;
    this.valorVenda = data.valorVenda;
  }
}

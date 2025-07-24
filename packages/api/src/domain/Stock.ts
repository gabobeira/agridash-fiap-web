export interface IStock {
  capacidadeEstoque: number;
  idProduto: string;
  nomeProduto: string;
  quantidadeEstoque: number;
  statusEstoque: string;
  unidadeMedida: string;
  valorUnitarioProducao: number;
  valorUnitarioVenda: number;
}

export class Stock implements IStock {
  capacidadeEstoque: number;
  idProduto: string;
  nomeProduto: string;
  quantidadeEstoque: number;
  statusEstoque: string;
  unidadeMedida: string;
  valorUnitarioProducao: number;
  valorUnitarioVenda: number;

  constructor(data: IStock) {
    this.capacidadeEstoque = data.capacidadeEstoque;
    this.idProduto = data.idProduto;
    this.nomeProduto = data.nomeProduto;
    this.quantidadeEstoque = data.quantidadeEstoque;
    this.statusEstoque = data.statusEstoque;
    this.unidadeMedida = data.unidadeMedida;
    this.valorUnitarioProducao = data.valorUnitarioProducao;
    this.valorUnitarioVenda = data.valorUnitarioVenda;
  }
}

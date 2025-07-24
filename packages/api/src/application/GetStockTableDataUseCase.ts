import { IStock } from '../domain/Stock';
import { StockRepository } from '../domain/StockRepository';

export interface StockData extends IStock {
  alertaEstoque: boolean;
}

export interface GetStockTableDataResponse {
  stockData: StockData[];
}

export class GetStockTableDataUseCase {
  constructor(private readonly stockRepository: StockRepository) {}

  async execute(): Promise<GetStockTableDataResponse> {
    const products = await this.stockRepository.getStockProducts();

    const stockData: StockData[] = products.map(product => {
      const alertaEstoque = product.statusEstoque.toUpperCase() === 'BAIXO';

      return {
        idProduto: product.idProduto,
        nomeProduto: product.nomeProduto,
        capacidadeEstoque: product.capacidadeEstoque,
        quantidadeEstoque: product.quantidadeEstoque,
        statusEstoque: product.statusEstoque,
        unidadeMedida: product.unidadeMedida,
        valorUnitarioProducao: product.valorUnitarioProducao,
        valorUnitarioVenda: product.valorUnitarioVenda,
        alertaEstoque,
      };
    });

    return { stockData };
  }
}

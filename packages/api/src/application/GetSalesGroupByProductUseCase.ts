import { SaleRepository } from '../domain/SaleRepository';

export interface GetSalesGroupByProductRequest {
  startDate?: Date;
  endDate?: Date;
}

export interface ProductGroupData {
  produto: string;
  quantidadeTotalVendida: number;
}

export interface GetSalesGroupByProductResponse {
  productGroups: ProductGroupData[];
}

export class GetSalesGroupByProductUseCase {
  constructor(private readonly saleRepository: SaleRepository) {}

  async execute(
    requestParams: GetSalesGroupByProductRequest
  ): Promise<GetSalesGroupByProductResponse> {
    const sales = await this.saleRepository.getSales({
      startDate: requestParams.startDate,
      endDate: requestParams.endDate,
    });

    // Agrupa as vendas por produto
    const salesByProduct = new Map<string, number>();

    sales.forEach(sale => {
      const currentTotal = salesByProduct.get(sale.produto) || 0;
      salesByProduct.set(sale.produto, currentTotal + sale.quantidadeProduto);
    });

    // Converte Map para array e ordena por quantidade total vendida (decrescente)
    const productGroups = Array.from(salesByProduct.entries())
      .map(([produto, quantidadeTotalVendida]) => ({
        produto,
        quantidadeTotalVendida,
      }))
      .sort((a, b) => b.quantidadeTotalVendida - a.quantidadeTotalVendida);

    return {
      productGroups,
    };
  }
}

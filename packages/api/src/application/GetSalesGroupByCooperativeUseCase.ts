import { SaleRepository } from '../domain/SaleRepository';

export interface GetSalesGroupByCooperativeRequest {
  startDate?: Date;
  endDate?: Date;
}

export interface CooperativeGroupData {
  cooperado: string;
  totalVendas: number;
}

export interface GetSalesGroupByCooperativeResponse {
  cooperativeGroups: CooperativeGroupData[];
}

export class GetSalesGroupByCooperativeUseCase {
  constructor(private readonly saleRepository: SaleRepository) {}

  async execute(
    requestParams: GetSalesGroupByCooperativeRequest
  ): Promise<GetSalesGroupByCooperativeResponse> {
    const sales = await this.saleRepository.getSales({
      startDate: requestParams.startDate,
      endDate: requestParams.endDate,
    });

    // Agrupa as vendas por cooperado
    const salesByCooperado = new Map<string, number>();

    sales.forEach(sale => {
      const currentTotal = salesByCooperado.get(sale.cooperado) || 0;
      salesByCooperado.set(sale.cooperado, currentTotal + sale.valorVenda);
    });

    // Converte Map para array e ordena por total de vendas (decrescente)
    const cooperativeGroups = Array.from(salesByCooperado.entries())
      .map(([cooperado, totalVendas]) => ({
        cooperado,
        totalVendas,
      }))
      .sort((a, b) => b.totalVendas - a.totalVendas);

    return {
      cooperativeGroups,
    };
  }
}

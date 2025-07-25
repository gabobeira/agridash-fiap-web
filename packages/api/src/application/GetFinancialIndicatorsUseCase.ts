import { SaleRepository } from '../domain/SaleRepository';
import { StockRepository } from '../domain/StockRepository';

export interface GetFinancialIndicatorsRequest {
  startDate?: Date;
  endDate?: Date;
}

export interface FinancialIndicators {
  despesaTotal: number; // Custo total de produção
  receitaTotal: number; // Valor total de vendas
  lucroTotal: number; // Receita - Despesa
  margemLucroTotal: number; // (Lucro / Receita) * 100
  quantidadeTotalVendida: number; // Total de produtos vendidos
  ticketMedio: number; // Receita / Quantidade de vendas
  totalTransacoes: number; // Número total de vendas
}

export interface GetFinancialIndicatorsResponse {
  indicators: FinancialIndicators;
  dateRange: {
    startDate?: string;
    endDate?: string;
  };
}

export class GetFinancialIndicatorsUseCase {
  constructor(
    private readonly saleRepository: SaleRepository,
    private readonly stockRepository: StockRepository
  ) {}

  async execute(
    requestParams: GetFinancialIndicatorsRequest
  ): Promise<GetFinancialIndicatorsResponse> {
    const { startDate, endDate } = requestParams;

    // Buscar todas as vendas no período
    const sales = await this.saleRepository.getSales({
      startDate,
      endDate,
    });

    // Buscar produtos para calcular custos
    const stockProducts = await this.stockRepository.getStockProducts();

    // Calcular totais
    let despesaTotal = 0;
    let receitaTotal = 0;
    let quantidadeTotalVendida = 0;
    const totalTransacoes = sales.length;

    sales.forEach(sale => {
      const stockProduct = stockProducts.find(
        p => p.nomeProduto === sale.produto
      );

      // Calcular custo (despesa)
      const custoUnitario = stockProduct?.valorUnitarioProducao || 0;
      const custoTotal = custoUnitario * sale.quantidadeProduto;

      // Calcular receita
      const precoUnitario =
        stockProduct?.valorUnitarioVenda || sale.valorVenda || 0;
      const receitaVenda = precoUnitario * sale.quantidadeProduto;

      despesaTotal += custoTotal;
      receitaTotal += receitaVenda;
      quantidadeTotalVendida += sale.quantidadeProduto;
    });

    // Calcular indicadores derivados
    const lucroTotal = receitaTotal - despesaTotal;
    const margemLucroTotal =
      receitaTotal > 0 ? (lucroTotal / receitaTotal) * 100 : 0;
    const ticketMedio =
      totalTransacoes > 0 ? receitaTotal / totalTransacoes : 0;

    const indicators: FinancialIndicators = {
      despesaTotal: Math.round(despesaTotal * 100) / 100, // 2 casas decimais
      receitaTotal: Math.round(receitaTotal * 100) / 100,
      lucroTotal: Math.round(lucroTotal * 100) / 100,
      margemLucroTotal: Math.round(margemLucroTotal * 100) / 100,
      quantidadeTotalVendida,
      ticketMedio: Math.round(ticketMedio * 100) / 100,
      totalTransacoes,
    };

    return {
      indicators,
      dateRange: {
        startDate: startDate?.toISOString().split('T')[0],
        endDate: endDate?.toISOString().split('T')[0],
      },
    };
  }
}

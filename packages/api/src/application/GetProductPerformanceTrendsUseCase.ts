import { SaleRepository } from '../domain/SaleRepository';
import { StockRepository } from '../domain/StockRepository';

export interface GetProductPerformanceTrendsRequest {
  startDate?: Date;
  endDate?: Date;
  productIds?: string[]; // Filtrar produtos específicos
}

export interface ProductPerformanceTrend {
  date: string; // Data no formato YYYY-MM-DD
  produto: string;
  volumeVendido: number;
  receitaDiaria: number;
  lucroDiario: number;
  margemLucro: number;
  participacaoVendas: number; // % das vendas totais do dia
}

export interface GetProductPerformanceTrendsResponse {
  trends: ProductPerformanceTrend[];
  products: string[];
  totalDays: number;
  dateRange: {
    startDate: string;
    endDate: string;
  };
}

export class GetProductPerformanceTrendsUseCase {
  constructor(
    private readonly saleRepository: SaleRepository,
    private readonly stockRepository: StockRepository
  ) {}

  async execute(
    requestParams: GetProductPerformanceTrendsRequest
  ): Promise<GetProductPerformanceTrendsResponse> {
    const { startDate, endDate, productIds } = requestParams;

    console.log('GetProductPerformanceTrendsUseCase - Params:', {
      startDate,
      endDate,
      productIds,
    });

    // Buscar vendas do período
    const sales = await this.saleRepository.getSales({
      startDate,
      endDate,
    });

    // Buscar produtos para calcular custos
    const products = await this.stockRepository.getStockProducts();

    console.log('Sales found:', sales.length);
    console.log('Products found:', products.length);

    // Filtrar por produtos específicos se fornecido
    const filteredSales =
      productIds && productIds.length > 0
        ? sales.filter(sale => productIds.includes(sale.produto))
        : sales;

    // Agrupar vendas por data e produto
    const dailyProductSales = new Map<
      string,
      Map<string, { volume: number; receita: number; custo: number }>
    >();

    // Calcular vendas totais por dia para participação
    const dailyTotalSales = new Map<string, number>();

    filteredSales.forEach(sale => {
      const dateKey = sale.data.toISOString().split('T')[0];
      const product = products.find(p => p.nomeProduto === sale.produto);

      const valorVenda = product?.valorUnitarioVenda ?? sale.valorVenda ?? 0;
      const valorCusto = product?.valorUnitarioProducao ?? 0;
      const receitaVenda = valorVenda * sale.quantidadeProduto;

      // Agrupar por data e produto
      if (!dailyProductSales.has(dateKey)) {
        dailyProductSales.set(dateKey, new Map());
      }

      const dayMap = dailyProductSales.get(dateKey)!;
      if (!dayMap.has(sale.produto)) {
        dayMap.set(sale.produto, { volume: 0, receita: 0, custo: 0 });
      }

      const productData = dayMap.get(sale.produto)!;
      productData.volume += sale.quantidadeProduto;
      productData.receita += receitaVenda;
      productData.custo += valorCusto * sale.quantidadeProduto;

      // Calcular total diário
      const currentTotal = dailyTotalSales.get(dateKey) ?? 0;
      dailyTotalSales.set(dateKey, currentTotal + receitaVenda);
    });

    // Converter para array de trends
    const trends: ProductPerformanceTrend[] = [];
    const uniqueProducts = new Set<string>();

    dailyProductSales.forEach((productMap, date) => {
      const dailyTotal = dailyTotalSales.get(date) ?? 0;

      productMap.forEach((data, produto) => {
        uniqueProducts.add(produto);

        const margemLucro =
          data.receita > 0
            ? ((data.receita - data.custo) / data.receita) * 100
            : 0;

        const participacaoVendas =
          dailyTotal > 0 ? (data.receita / dailyTotal) * 100 : 0;

        trends.push({
          date,
          produto,
          volumeVendido: data.volume,
          receitaDiaria: Number(data.receita.toFixed(2)),
          lucroDiario: Number((data.receita - data.custo).toFixed(2)),
          margemLucro: Number(margemLucro.toFixed(2)),
          participacaoVendas: Number(participacaoVendas.toFixed(2)),
        });
      });
    });

    // Ordenar por data e produto
    trends.sort((a, b) => {
      if (a.date !== b.date) {
        return a.date.localeCompare(b.date);
      }
      return a.produto.localeCompare(b.produto);
    });

    const uniqueDates = new Set(trends.map(t => t.date));
    const result = {
      trends,
      products: Array.from(uniqueProducts).sort(),
      totalDays: uniqueDates.size,
      dateRange: {
        startDate: startDate?.toISOString().split('T')[0] ?? '',
        endDate: endDate?.toISOString().split('T')[0] ?? '',
      },
    };

    console.log('GetProductPerformanceTrendsUseCase - Result:', {
      trendsCount: result.trends.length,
      productsCount: result.products.length,
      totalDays: result.totalDays,
    });

    return result;
  }
}

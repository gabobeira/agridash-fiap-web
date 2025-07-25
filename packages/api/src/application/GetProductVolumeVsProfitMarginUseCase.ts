import { SaleRepository } from '../domain/SaleRepository';
import { StockRepository } from '../domain/StockRepository';

export interface GetProductVolumeVsProfitMarginRequest {
  startDate?: Date;
  endDate?: Date;
  productIds?: string[]; // Opcional para filtrar produtos específicos
}

export interface ProductVolumeVsProfitMargin {
  produto: string;
  volumeVenda: number; // SOMA(Quantidade Vendida)
  margemLucro: number; // Margem de Lucro (%) por produto
  valorTotalVenda: number; // Para referência adicional
  valorTotalCusto: number; // Para referência adicional
  valorTotalLucro: number; // Para referência adicional
  categoria:
    | 'Alto Volume, Alta Margem'
    | 'Alto Volume, Baixa Margem'
    | 'Baixo Volume, Alta Margem'
    | 'Baixo Volume, Baixa Margem';
}

export interface GetProductVolumeVsProfitMarginResponse {
  products: ProductVolumeVsProfitMargin[];
  statistics: {
    medianVolume: number;
    medianMargin: number;
    totalProducts: number;
    categoryDistribution: {
      'Alto Volume, Alta Margem': number;
      'Alto Volume, Baixa Margem': number;
      'Baixo Volume, Alta Margem': number;
      'Baixo Volume, Baixa Margem': number;
    };
  };
  dateRange: {
    startDate?: string;
    endDate?: string;
  };
}

export class GetProductVolumeVsProfitMarginUseCase {
  constructor(
    private readonly saleRepository: SaleRepository,
    private readonly stockRepository: StockRepository
  ) {}

  async execute(
    requestParams: GetProductVolumeVsProfitMarginRequest
  ): Promise<GetProductVolumeVsProfitMarginResponse> {
    const { startDate, endDate, productIds } = requestParams;

    // Buscar todas as vendas no período
    const sales = await this.saleRepository.getSales({
      startDate,
      endDate,
    });

    // Buscar produtos para calcular custos
    const stockProducts = await this.stockRepository.getStockProducts();

    // Filtrar por produtos específicos se fornecido
    const filteredSales =
      productIds && productIds.length > 0
        ? sales.filter(sale => productIds.includes(sale.produto))
        : sales;

    console.log('Filtered sales:', filteredSales.length);
    console.log('Stock products:', stockProducts.length);

    // Agrupar vendas por produto de forma mais simples
    const productSalesMap = new Map<
      string,
      {
        totalQuantidade: number;
        totalValorVenda: number;
        totalValorCusto: number;
      }
    >();

    filteredSales.forEach(sale => {
      const productName = sale.produto;
      const stockProduct = stockProducts.find(
        p => p.nomeProduto === productName
      );

      // Se não encontrar o produto no estoque, usar valores padrão
      const valorUnitarioProducao = stockProduct?.valorUnitarioProducao || 0;
      const valorUnitarioVenda =
        stockProduct?.valorUnitarioVenda || sale.valorVenda || 0;

      const valorCustoTotal = valorUnitarioProducao * sale.quantidadeProduto;
      const valorVendaTotal = valorUnitarioVenda * sale.quantidadeProduto;

      const existing = productSalesMap.get(productName) || {
        totalQuantidade: 0,
        totalValorVenda: 0,
        totalValorCusto: 0,
      };

      productSalesMap.set(productName, {
        totalQuantidade: existing.totalQuantidade + sale.quantidadeProduto,
        totalValorVenda: existing.totalValorVenda + valorVendaTotal,
        totalValorCusto: existing.totalValorCusto + valorCustoTotal,
      });
    });

    console.log('Product sales map:', productSalesMap.size);

    // Converter para array e calcular margem de lucro
    const productsData: ProductVolumeVsProfitMargin[] = Array.from(
      productSalesMap.entries()
    ).map(([produto, data]) => {
      const valorTotalLucro = data.totalValorVenda - data.totalValorCusto;
      let margemLucro = 0;

      if (data.totalValorVenda > 0) {
        margemLucro = (valorTotalLucro / data.totalValorVenda) * 100;
      }

      return {
        produto,
        volumeVenda: data.totalQuantidade,
        margemLucro: Math.round(margemLucro * 100) / 100, // 2 casas decimais
        valorTotalVenda: data.totalValorVenda,
        valorTotalCusto: data.totalValorCusto,
        valorTotalLucro,
        categoria: 'Baixo Volume, Baixa Margem', // Será calculado depois
      };
    });

    console.log('Products data before categorization:', productsData.length);

    // Se não há dados, retornar estrutura vazia
    if (productsData.length === 0) {
      return {
        products: [],
        statistics: {
          medianVolume: 0,
          medianMargin: 0,
          totalProducts: 0,
          categoryDistribution: {
            'Alto Volume, Alta Margem': 0,
            'Alto Volume, Baixa Margem': 0,
            'Baixo Volume, Alta Margem': 0,
            'Baixo Volume, Baixa Margem': 0,
          },
        },
        dateRange: {
          startDate: startDate?.toISOString().split('T')[0],
          endDate: endDate?.toISOString().split('T')[0],
        },
      };
    }

    // Calcular medianas de forma mais robusta
    const volumes = productsData
      .map(p => p.volumeVenda)
      .filter(v => v > 0)
      .sort((a, b) => a - b);
    const margins = productsData
      .map(p => p.margemLucro)
      .filter(m => !isNaN(m))
      .sort((a, b) => a - b);

    const medianVolume = volumes.length > 0 ? this.calculateMedian(volumes) : 0;
    const medianMargin = margins.length > 0 ? this.calculateMedian(margins) : 0;

    console.log('Median volume:', medianVolume, 'Median margin:', medianMargin);

    // Classificar produtos em categorias
    const categoryDistribution = {
      'Alto Volume, Alta Margem': 0,
      'Alto Volume, Baixa Margem': 0,
      'Baixo Volume, Alta Margem': 0,
      'Baixo Volume, Baixa Margem': 0,
    };

    productsData.forEach(product => {
      const isHighVolume = product.volumeVenda >= medianVolume;
      const isHighMargin = product.margemLucro >= medianMargin;

      if (isHighVolume && isHighMargin) {
        product.categoria = 'Alto Volume, Alta Margem';
      } else if (isHighVolume && !isHighMargin) {
        product.categoria = 'Alto Volume, Baixa Margem';
      } else if (!isHighVolume && isHighMargin) {
        product.categoria = 'Baixo Volume, Alta Margem';
      } else {
        product.categoria = 'Baixo Volume, Baixa Margem';
      }

      categoryDistribution[product.categoria]++;
    });

    const result = {
      products: productsData.sort((a, b) => b.volumeVenda - a.volumeVenda),
      statistics: {
        medianVolume: Math.round(medianVolume * 100) / 100,
        medianMargin: Math.round(medianMargin * 100) / 100,
        totalProducts: productsData.length,
        categoryDistribution,
      },
      dateRange: {
        startDate: startDate?.toISOString().split('T')[0],
        endDate: endDate?.toISOString().split('T')[0],
      },
    };

    console.log('Final result:', result);
    return result;
  }

  private calculateMedian(values: number[]): number {
    if (values.length === 0) return 0;

    const mid = Math.floor(values.length / 2);
    if (values.length % 2 === 0) {
      return (values[mid - 1] + values[mid]) / 2;
    } else {
      return values[mid];
    }
  }
}

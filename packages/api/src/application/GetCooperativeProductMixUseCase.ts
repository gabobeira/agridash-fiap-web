import { SaleRepository } from '../domain/SaleRepository';
import { StockRepository } from '../domain/StockRepository';

export interface GetCooperativeProductMixRequest {
  startDate?: Date;
  endDate?: Date;
  cooperativeIds?: string[]; // Filtrar cooperados específicos
}

export interface CooperativeProductMix {
  cooperado: string;
  produto: string;
  quantidadeVendida: number;
  percentualDoCooperado: number; // % das vendas do cooperado
  percentualDoProduto: number; // % das vendas totais do produto
  receitaGerada: number;
  lucroPorProduto: number;
  frequenciaVendas: number; // quantas vezes vendeu este produto
  concentracaoIndice: number; // índice de concentração (0-1)
}

export interface CooperativeProductInsights {
  cooperadoMaisDiversificado: string;
  cooperadoMaisEspecializado: string;
  produtoMaisConcentrado: string;
  produtoMaisDistribuido: string;
}

export interface GetCooperativeProductMixResponse {
  cooperativeProductMatrix: CooperativeProductMix[];
  cooperatives: string[];
  products: string[];
  insights: CooperativeProductInsights;
  statistics: {
    totalCooperatives: number;
    totalProducts: number;
    averageDiversification: number;
    totalInteractions: number;
  };
}

export class GetCooperativeProductMixUseCase {
  constructor(
    private readonly saleRepository: SaleRepository,
    private readonly stockRepository: StockRepository
  ) {}

  async execute(
    requestParams: GetCooperativeProductMixRequest
  ): Promise<GetCooperativeProductMixResponse> {
    const { startDate, endDate, cooperativeIds } = requestParams;

    console.log('GetCooperativeProductMixUseCase - Params:', {
      startDate,
      endDate,
      cooperativeIds,
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

    // Filtrar por cooperados específicos se fornecido
    const filteredSales =
      cooperativeIds && cooperativeIds.length > 0
        ? sales.filter(sale => cooperativeIds.includes(sale.cooperado))
        : sales;

    // Estruturas para cálculos
    const cooperativeProductData = new Map<
      string,
      Map<
        string,
        {
          quantidade: number;
          receita: number;
          custo: number;
          frequencia: number;
        }
      >
    >();

    const cooperativeTotals = new Map<string, number>(); // Total de vendas por cooperado
    const productTotals = new Map<string, number>(); // Total de vendas por produto

    // Processar vendas
    filteredSales.forEach(sale => {
      const product = products.find(p => p.nomeProduto === sale.produto);
      const valorVenda = product?.valorUnitarioVenda ?? sale.valorVenda ?? 0;
      const valorCusto = product?.valorUnitarioProducao ?? 0;
      const receitaVenda = valorVenda * sale.quantidadeProduto;

      // Inicializar estruturas se necessário
      if (!cooperativeProductData.has(sale.cooperado)) {
        cooperativeProductData.set(sale.cooperado, new Map());
      }

      const cooperativeMap = cooperativeProductData.get(sale.cooperado)!;
      if (!cooperativeMap.has(sale.produto)) {
        cooperativeMap.set(sale.produto, {
          quantidade: 0,
          receita: 0,
          custo: 0,
          frequencia: 0,
        });
      }

      // Atualizar dados
      const productData = cooperativeMap.get(sale.produto)!;
      productData.quantidade += sale.quantidadeProduto;
      productData.receita += receitaVenda;
      productData.custo += valorCusto * sale.quantidadeProduto;
      productData.frequencia += 1;

      // Atualizar totais
      const currentCoopTotal = cooperativeTotals.get(sale.cooperado) ?? 0;
      cooperativeTotals.set(sale.cooperado, currentCoopTotal + receitaVenda);

      const currentProdTotal = productTotals.get(sale.produto) ?? 0;
      productTotals.set(sale.produto, currentProdTotal + receitaVenda);
    });

    // Calcular matriz de produtos por cooperado
    const cooperativeProductMatrix: CooperativeProductMix[] = [];

    cooperativeProductData.forEach((productMap, cooperado) => {
      const cooperativeTotal = cooperativeTotals.get(cooperado) ?? 0;

      productMap.forEach((data, produto) => {
        const productTotal = productTotals.get(produto) ?? 0;

        const percentualDoCooperado =
          cooperativeTotal > 0 ? (data.receita / cooperativeTotal) * 100 : 0;

        const percentualDoProduto =
          productTotal > 0 ? (data.receita / productTotal) * 100 : 0;

        // Índice de concentração (baseado no percentual dentro do cooperado)
        const concentracaoIndice = percentualDoCooperado / 100;

        cooperativeProductMatrix.push({
          cooperado,
          produto,
          quantidadeVendida: data.quantidade,
          percentualDoCooperado: Number(percentualDoCooperado.toFixed(2)),
          percentualDoProduto: Number(percentualDoProduto.toFixed(2)),
          receitaGerada: Number(data.receita.toFixed(2)),
          lucroPorProduto: Number((data.receita - data.custo).toFixed(2)),
          frequenciaVendas: data.frequencia,
          concentracaoIndice: Number(concentracaoIndice.toFixed(3)),
        });
      });
    });

    // Calcular insights
    const cooperatives = Array.from(cooperativeProductData.keys());
    const allProducts = Array.from(productTotals.keys());

    // Cooperado mais diversificado (mais produtos diferentes)
    let maxProducts = 0;
    let cooperadoMaisDiversificado = '';
    cooperativeProductData.forEach((productMap, cooperado) => {
      if (productMap.size > maxProducts) {
        maxProducts = productMap.size;
        cooperadoMaisDiversificado = cooperado;
      }
    });

    // Cooperado mais especializado (menor diversificação)
    let minProducts = Infinity;
    let cooperadoMaisEspecializado = '';
    cooperativeProductData.forEach((productMap, cooperado) => {
      if (productMap.size < minProducts) {
        minProducts = productMap.size;
        cooperadoMaisEspecializado = cooperado;
      }
    });

    // Produto mais concentrado (vendido por menos cooperados)
    const productCooperativeCount = new Map<string, number>();
    cooperativeProductMatrix.forEach(item => {
      const current = productCooperativeCount.get(item.produto) ?? 0;
      productCooperativeCount.set(item.produto, current + 1);
    });

    let minCooperatives = Infinity;
    let produtoMaisConcentrado = '';
    productCooperativeCount.forEach((count, produto) => {
      if (count < minCooperatives) {
        minCooperatives = count;
        produtoMaisConcentrado = produto;
      }
    });

    // Produto mais distribuído (vendido por mais cooperados)
    let maxCooperatives = 0;
    let produtoMaisDistribuido = '';
    productCooperativeCount.forEach((count, produto) => {
      if (count > maxCooperatives) {
        maxCooperatives = count;
        produtoMaisDistribuido = produto;
      }
    });

    // Calcular estatísticas
    const totalDiversifications = cooperatives.reduce((sum, cooperado) => {
      return sum + (cooperativeProductData.get(cooperado)?.size ?? 0);
    }, 0);

    const averageDiversification =
      cooperatives.length > 0 ? totalDiversifications / cooperatives.length : 0;

    const result = {
      cooperativeProductMatrix: cooperativeProductMatrix.sort((a, b) => {
        if (a.cooperado !== b.cooperado) {
          return a.cooperado.localeCompare(b.cooperado);
        }
        return b.receitaGerada - a.receitaGerada; // Ordenar por receita dentro do cooperado
      }),
      cooperatives: cooperatives.sort(),
      products: allProducts.sort(),
      insights: {
        cooperadoMaisDiversificado,
        cooperadoMaisEspecializado,
        produtoMaisConcentrado,
        produtoMaisDistribuido,
      },
      statistics: {
        totalCooperatives: cooperatives.length,
        totalProducts: allProducts.length,
        averageDiversification: Number(averageDiversification.toFixed(2)),
        totalInteractions: cooperativeProductMatrix.length,
      },
    };

    console.log('GetCooperativeProductMixUseCase - Result:', {
      matrixSize: result.cooperativeProductMatrix.length,
      cooperativesCount: result.cooperatives.length,
      productsCount: result.products.length,
      insights: result.insights,
    });

    return result;
  }
}

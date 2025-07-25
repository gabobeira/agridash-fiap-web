import { SaleRepository } from '../domain/SaleRepository';
import { StockRepository } from '../domain/StockRepository';

export interface GetCooperativeProfitByDayRequest {
  startDate: Date;
  endDate: Date;
  cooperativeIds?: string[]; // Opcional para filtrar cooperados específicos
}

export interface CooperativeProfitByDay {
  date: string; // Data no formato YYYY-MM-DD para facilitar o agrupamento
  cooperativeProfit: Record<string, number>; // { [cooperado]: lucro }
}

export interface GetCooperativeProfitByDayResponse {
  profitByDay: CooperativeProfitByDay[];
  cooperatives: string[]; // Lista de todos os cooperados para referência
  totalDays: number;
  dateRange: {
    startDate: string;
    endDate: string;
  };
}

export class GetCooperativeProfitByDayUseCase {
  constructor(
    private readonly saleRepository: SaleRepository,
    private readonly stockRepository: StockRepository
  ) {}

  async execute(
    requestParams: GetCooperativeProfitByDayRequest
  ): Promise<GetCooperativeProfitByDayResponse> {
    const { startDate, endDate, cooperativeIds } = requestParams;

    // Buscar todas as vendas no período
    const sales = await this.saleRepository.getSales({
      startDate,
      endDate,
    });

    // Buscar produtos para calcular custos
    const products = await this.stockRepository.getStockProducts();

    // Filtrar por cooperados específicos se fornecido
    const filteredSales =
      cooperativeIds && cooperativeIds.length > 0
        ? sales.filter(sale => cooperativeIds.includes(sale.cooperado))
        : sales;

    // Agrupar vendas por data e cooperado
    const salesByDateAndCooperative = new Map<string, Map<string, number>>();
    const cooperativesSet = new Set<string>();

    filteredSales.forEach(sale => {
      const dateKey = this.formatDate(sale.data);
      const cooperativeName = sale.cooperado;

      cooperativesSet.add(cooperativeName);

      // Calcular lucro da venda
      const product = products.find(p => p.nomeProduto === sale.produto);
      const valorCustoTotal =
        (product?.valorUnitarioProducao ?? 0) * sale.quantidadeProduto;
      const valorVendaTotal =
        (product?.valorUnitarioVenda ?? 0) * sale.quantidadeProduto;
      const valorLucro = valorVendaTotal - valorCustoTotal;

      if (!salesByDateAndCooperative.has(dateKey)) {
        salesByDateAndCooperative.set(dateKey, new Map());
      }

      const cooperativeMap = salesByDateAndCooperative.get(dateKey)!;
      const currentProfit = cooperativeMap.get(cooperativeName) ?? 0;
      cooperativeMap.set(cooperativeName, currentProfit + valorLucro);
    });

    // Gerar lista de todas as datas no período
    const allDates = this.generateDateRange(startDate, endDate);
    const cooperatives = Array.from(cooperativesSet).sort();

    // Construir resposta garantindo que todas as datas tenham dados
    const profitByDay: CooperativeProfitByDay[] = allDates.map(date => {
      const dateKey = this.formatDate(date);
      const cooperativeMap =
        salesByDateAndCooperative.get(dateKey) ?? new Map();

      const cooperativeProfit: Record<string, number> = {};
      cooperatives.forEach(cooperative => {
        cooperativeProfit[cooperative] = cooperativeMap.get(cooperative) ?? 0;
      });

      return {
        date: dateKey,
        cooperativeProfit,
      };
    });

    return {
      profitByDay,
      cooperatives,
      totalDays: allDates.length,
      dateRange: {
        startDate: this.formatDate(startDate),
        endDate: this.formatDate(endDate),
      },
    };
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  }

  private generateDateRange(startDate: Date, endDate: Date): Date[] {
    const dates: Date[] = [];
    const currentDate = new Date(startDate);
    const end = new Date(endDate);

    while (currentDate <= end) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }
}

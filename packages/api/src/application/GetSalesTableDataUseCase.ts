import { DocumentSnapshot } from 'firebase/firestore';
import { SaleRepository } from '../domain/SaleRepository';
import { StockRepository } from '../domain/StockRepository';

export interface GetSalesTableDataRequest {
  startDate?: Date;
  endDate?: Date;
  productId?: string;
  cooperativeId?: string;
  pageSize?: number;
  page?: number;
  lastDoc?: DocumentSnapshot;
  includeCount?: boolean;
}

export interface SaleData {
  cooperado: string;
  data: Date;
  produto: string;
  quantidadeProduto: number;
  unidadeMedida: string;
  valorVendaTotal: number;
  valorCustoTotal: number;
  valorLucro: number;
  margemLucro: number;
}

export interface GetSalesTableDataResponse {
  salesData: SaleData[];
  lastDoc?: DocumentSnapshot;
  hasMore?: boolean;
  currentPage?: number;
  totalPages?: number;
  totalCount?: number;
}

export class GetSalesTableDataUseCase {
  constructor(
    private readonly saleRepository: SaleRepository,
    private readonly stockRepository: StockRepository
  ) {}

  async execute(
    requestParams: GetSalesTableDataRequest
  ): Promise<GetSalesTableDataResponse> {
    const { sales, lastDoc, hasMore, currentPage, totalPages, totalCount } =
      await this.saleRepository.getSales(requestParams);
    const products = await this.stockRepository.getStockProducts();

    const salesData: SaleData[] = sales.map(sale => {
      const product = products.find(p => p.nomeProduto === sale.produto);
      const valorCustoTotal =
        (product?.valorUnitarioProducao ?? 0) * sale.quantidadeProduto;
      const valorVendaTotal =
        (product?.valorUnitarioVenda ?? 0) * sale.quantidadeProduto;
      const valorLucro = valorVendaTotal - valorCustoTotal;
      const margemLucro =
        ((valorVendaTotal - valorCustoTotal) / valorVendaTotal) * 100;

      return {
        cooperado: sale.cooperado,
        data: sale.data,
        produto: sale.produto,
        quantidadeProduto: sale.quantidadeProduto,
        unidadeMedida: product?.unidadeMedida || 'N/A',
        valorVendaTotal,
        valorCustoTotal,
        valorLucro,
        margemLucro,
      };
    });

    return { salesData, lastDoc, hasMore, currentPage, totalPages, totalCount };
  }
}

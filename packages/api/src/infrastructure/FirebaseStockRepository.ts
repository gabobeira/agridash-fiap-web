import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { Stock } from '../domain/Stock';
import { StockRepository } from '../domain/StockRepository';

export class FirebaseStockRepository implements StockRepository {
  private readonly db;
  private readonly collectionRef;

  constructor(firebaseConfig: object) {
    let app: FirebaseApp;
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
    this.db = getFirestore(app);
    this.collectionRef = collection(this.db, 'estoque');
  }

  async getStockProducts(): Promise<Stock[]> {
    const snapshot = await getDocs(this.collectionRef);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return new Stock({
        capacidadeEstoque: data.capacidade_estoque,
        idProduto: data.id_produto,
        nomeProduto: data.nome_produto,
        quantidadeEstoque: data.quantidade_estoque,
        statusEstoque: data.status_estoque,
        unidadeMedida: data.unidade_medida,
        valorUnitarioProducao: data.valor_unitario_producao,
        valorUnitarioVenda: data.valor_unitario_venda,
      });
    });
  }
}

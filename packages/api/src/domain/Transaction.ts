import { Timestamp } from 'firebase/firestore';

export interface Transaction {
  cooperado: string;
  data: string | Date | Timestamp;
  produto: string;
  quantidade: number;
  valor: number;
}

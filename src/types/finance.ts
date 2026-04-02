export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string;
  title: string;
  description: string;
  category: string;
  type: TransactionType;
  amount: number;
}

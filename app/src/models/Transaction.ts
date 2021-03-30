export enum TransactionType {
  RECEIVED = "RECEIVED", SENT = "SENT"
};

export type Transaction = {
  accountId: number;
  orderId: string;
  orderCode: string;
  type: TransactionType;
  debit?: number;
  credit?: number;
  balance: number;
  date: number;
};
export type Account = {
    id: number;
    account: string;
    category: string;
    tag: string;
    balance: number;
    availableBalance: number;
};

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
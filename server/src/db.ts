import { Transaction, Account, TransactionType } from './models';
import { v4 } from 'uuid';

export const accounts: Account[] = [
    {id: 1, account: "Joe account", category: "Category 1", tag: "tag 1", balance: 0, availableBalance: 0},
    {id: 2, account: "peter account", category: "Category 2", tag: "tag 1", balance: 1, availableBalance: 1},
    {id: 3, account: "John account", category: "Category 3", tag: "tag 2", balance: 2, availableBalance: 2},
    {id: 4, account: "Rose account", category: "Category 3", tag: "tag 2", balance: 3, availableBalance: 3},
    {id: 5, account: "Mary account", category: "Category 3", tag: "tag 3", balance: 4, availableBalance: 4},
    {id: 6, account: "Bob account", category: "Category 2", tag: "tag 3", balance: 5, availableBalance: 5},
    {id: 7, account: "Sponge account", category: "Category 1", tag: "tag 4", balance: 6, availableBalance: 6},
    {id: 8, account: "Carl account", category: "Category 3", tag: "tag 4", balance: 7, availableBalance: 7},
    {id: 9, account: "Elton account", category: "Category 3", tag: "tag 5", balance: 8, availableBalance: 8},
    {id: 10, account: "Chris account", category: "Category 1", tag: "tag 5", balance: 9, availableBalance: 9},
    {id: 11, account: "Sofie account", category: "Category 4", tag: "tag 1", balance: 10, availableBalance: 10},
    {id: 12, account: "Jason account", category: "Category 3", tag: "tag 4", balance: 11, availableBalance: 11},
    {id: 13, account: "Nick account", category: "Category 4", tag: "tag 2", balance: 12, availableBalance: 12},
    {id: 14, account: "Mikel account", category: "Category 4", tag: "tag 3", balance: 13, availableBalance: 13},
    {id: 15, account: "Rob account", category: "Category 4", tag: "tag 5", balance: 14, availableBalance: 14}
];

export const transactions = randomTransactions();

function randomTransactions(): Transaction[] {
    let transactions: Transaction[] = [];
    accounts.forEach(account => {
        let random = (Math.random() * (10 - 1)) + 1;
        for(let i = 0; i<3; i++){
            let type = (Math.round(Math.random()) === 0) ? TransactionType.RECEIVED : TransactionType.SENT;
            let transaction: Transaction = {
                accountId: account.id,
                orderId: v4(),
                orderCode: v4(),
                balance: random,
                type,
                date: Date.now()
            };
            if(type === TransactionType.RECEIVED){
                transaction.credit = Math.random();
            }else{
                transaction.debit = Math.random();
            }
            transactions.push(transaction);
        }
    });
    return transactions;
}
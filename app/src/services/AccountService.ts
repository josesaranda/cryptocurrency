import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FetchService } from "./FetchService";
import { Account } from '../models/Account';
import { Service } from "./Service";
import { BehaviorSubject } from "rxjs";
import { SocketService } from "./SocketService";
import { Transaction } from "src/models/Transaction";

@Injectable({
    providedIn: 'root'
})
export class AccountService implements Partial<Service<Account>> {
    private changedAccount = new BehaviorSubject<Account | undefined>(undefined);
    private fetchService!: FetchService<Account>;

    constructor(httpClient: HttpClient){
        this.fetchService = new FetchService<Account>(httpClient);
        this.fetchService.init('accounts');
    }

    findAll(): Promise<Account[]> {
        return this.fetchService.findAll();
    }

    findOne(id: number): Promise<Account> {
        return this.fetchService.findOne(id);
    }

    findOneTransactions(id: number): Promise<Transaction[]> {
        return this.fetchService.fetch<Transaction[]>('get','accounts/' + id + '/transactions');
    }

    observeAccount(): BehaviorSubject<Account | undefined> {
        this.socketAccount();
        return this.changedAccount;
    }

    private socketAccount(){
        let socketService = SocketService.getInstance();
        socketService.connect();
        socketService.onNewAccount(value => {
            this.changedAccount.next(value);
        });
    }

}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FetchService } from "./FetchService";
import { Account } from '../models/Account';
import { Service } from "./Service";
import { BehaviorSubject } from "rxjs";
import { SocketService } from "./SocketService";

@Injectable({
    providedIn: 'root'
})
export class AccountService implements Partial<Service<Account>> {
    private changedAccount = new BehaviorSubject<Account | undefined>(undefined);
    private fetchService!: FetchService<Account>;

    constructor(httpClient: HttpClient){
        this.fetchService = new FetchService<Account>(httpClient);
        this.fetchService.init('accounts');
        this.socketAccount();
    }

    findAll(): Promise<Account[]> {
        return this.fetchService.findAll();
    }

    socketAccount(){
        let socketService = SocketService.getInstance();
        socketService.connect();
        socketService.onNewAccount(value => {
            this.changedAccount.next(value);
        });
    }

    onChangeAccount(): BehaviorSubject<Account | undefined> {
        return this.changedAccount;
    }
}
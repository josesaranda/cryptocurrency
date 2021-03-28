import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FetchService } from "./FetchService";
import { Account } from '../models/Account';
import { Service } from "./Service";

@Injectable({
    providedIn: 'root'
})
export class AccountService implements Partial<Service<Account>> {

    fetchService!: FetchService<Account>;

    constructor(httpClient: HttpClient){
        this.fetchService = new FetchService<Account>(httpClient);
        this.fetchService.init('accounts');
    }

    findAll(): Promise<Account[]> {
        return this.fetchService.findAll();
    }
}
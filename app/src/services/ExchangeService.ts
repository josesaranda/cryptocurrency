import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FetchService } from "./FetchService";

@Injectable({
    providedIn: 'root'
})
export class ExchangeService {
    
    fetchService!: FetchService<{value: number}>;

    constructor(httpClient: HttpClient){
        this.fetchService = new FetchService<{value: number}>(httpClient);
        this.fetchService.init('');
    }

    getExchange(){
        return this.fetchService.fetch<{value: number}>('get', 'exchange');
    }
}
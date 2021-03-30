import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { FetchService } from "./FetchService";
import { SocketService } from "./SocketService";

@Injectable({
    providedIn: 'root'
})
export class ExchangeService {
    private exchange = new BehaviorSubject<number | undefined>(undefined);
    private fetchService!: FetchService;

    constructor(httpClient: HttpClient){
        this.fetchService = new FetchService<{value: number}>(httpClient);
        this.fetchService.init('');
    }

    async getExchange(){
        if(this.exchange.getValue() === undefined){
            let { value } = await this.fetchService.fetch<{value: number}>('get', 'exchange');
            this.exchange.next(value);
        }
        return this.exchange.getValue();
    }

    observeExchange(): BehaviorSubject<number | undefined>{
        this.socketExchange();
        return this.exchange;
    }

    private socketExchange(){
        let socketService = SocketService.getInstance();
        socketService.connect();
        socketService.onNewExchange(value => {
            this.exchange.next(value);
        });
    }
}
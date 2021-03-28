import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Service } from "./Service";

export class FetchService<T> implements Service<T> {

    path!: string;

    constructor(private httpClient: HttpClient){}

    init(path: string): void{
        this.path = path;
    }

    private checkInit(): void{
        if(this.path === undefined)
            throw new Error('Path must be provided. Please call init before run this function');
    }

    findAll(): Promise<T[]>{
        this.checkInit();
        console.log('Host', environment.host + '/' + this.path);
        return this.httpClient.get<T[]>(environment.host + '/' + this.path).toPromise();
    }

    findOne(id: string): Promise<T> {
        this.checkInit();
        console.log('Host', environment.host + '/' + this.path);
        return this.httpClient.get<T>(environment.host + '/' + this.path + id).toPromise();
    }

    fetch<U>(method: 'get' | 'post' | 'put' | 'delete', route: string, body: any = {}): Promise<U> {
        switch(method){
            case 'get':
                return this.httpClient.get<U>(environment.host + '/' + route).toPromise();
            case 'post':
                return this.httpClient.post<U>(environment.host + '/' + route, body).toPromise();
            case 'put':
                return this.httpClient.put<U>(environment.host + '/' + route, body).toPromise();
            case 'delete':
                return this.httpClient.delete<U>(environment.host + '/' + route).toPromise();
            default:
                return this.httpClient.get<U>(environment.host + '/' + route).toPromise();
        }
    }
}
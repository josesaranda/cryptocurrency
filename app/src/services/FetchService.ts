import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Service } from "./Service";

export class FetchService<T = any> implements Service<T> {

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
        return this.httpClient.get<T[]>([environment.host, this.path].join('/')).toPromise();
    }

    findOne<Index = number | string>(id: Index): Promise<T> {
        this.checkInit();
        return this.httpClient.get<T>([environment.host, this.path, id].join('/')).toPromise();
    }

    fetch<U>(method: 'get' | 'post' | 'put' | 'delete', route: string, body: any = {}): Promise<U> {
        let fullPath = [environment.host, route].join('/');
        switch(method){
            case 'get':
                return this.httpClient.get<U>(fullPath).toPromise();
            case 'post':
                return this.httpClient.post<U>(fullPath, body).toPromise();
            case 'put':
                return this.httpClient.put<U>(fullPath, body).toPromise();
            case 'delete':
                return this.httpClient.delete<U>(fullPath).toPromise();
            default:
                return this.httpClient.get<U>(fullPath).toPromise();
        }
    }
}
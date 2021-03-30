import { Socket, io } from 'socket.io-client';
import { Account } from '../models/Account';

export class SocketService {
    private static instance?: SocketService;

    private socket?: Socket;

    constructor(){}

    public static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }

        return SocketService.instance;
    }

    public connect(): void {
        if(!this.socket)
            this.socket = io("http://localhost:3001", {path: '/socket'}).connect();
    }

    public onNewExchange(callback: (value: number) => void){
        this.checkConnection();
        this.socket!.on('new:exchange', (value: number) => {
            callback(value);
        });
    }

    public onNewAccount(callback: (value: Account) => void){
        this.checkConnection();
        this.socket!.on('new:balance', (value: Account) => {
            callback(value);
        });
    }

    private checkConnection(){
        if(!this.socket)
            throw new Error('Must call connect before run this function');
    }
}
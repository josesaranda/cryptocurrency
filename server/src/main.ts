import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'socket.io';
import { AppService } from './app.service';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appService = new AppService();

  runServer(app, 3000);

  let io = await runSocket(3001, '/socket');

  setInterval(() => {
    io.emit('new:exchange', appService.getExchange());
  },10000);

  setInterval(() => {
    let account = appService.findRandomAccount();
    let randomBalance = Math.random() * 15;
    account = appService.updateAccount(account.id, {balance: randomBalance, availableBalance: randomBalance});
    io.emit('new:balance', account);
  },12000);
}

bootstrap();

async function runServer(app: INestApplication, port: number){
  app.enableCors();
  await app.listen(port);
  console.log(`Server listening on http://localhost:${port}`);
}

async function runSocket(port: number, path: string){
  let socket = new Server({path, cors: {
    origin: '*',
    methods: ['GET']
  }}).listen(3001);
  console.log(`Socket listening on http://localhost:${port}${path}`);
  return socket;
}

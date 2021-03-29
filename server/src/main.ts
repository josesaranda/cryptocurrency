import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'socket.io';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appService = new AppService();
  app.enableCors();
  app.listen(3000).then(() => {
    console.log('Server listening on http://localhost:3000');
    let io = new Server({path: '/socket', cors: {
      origin: '*',
      methods: ['GET']
    }}).listen(3001);
    console.log('Socket listening on http://localhost:3001/socket');
    setInterval(() => {
      io.emit('new:exchange', appService.getExchange());
    },10000);
    setInterval(() => {
      let account = appService.findRandomAccount();
      let randomBalance = Math.random() * 15;
      account.balance = randomBalance;
      account.availableBalance = randomBalance;
      let { id, ...rest} = account;
      appService.updateAccount(id, rest);
      io.emit('new:balance', account);
    },12000);
  });
}
bootstrap();

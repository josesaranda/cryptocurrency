import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.listen(3000).then(() => {
    console.log('Server listen on http://localhost:3000');
    let io = new Server({path: '/socket'}).listen(3001);
  });
}
bootstrap();

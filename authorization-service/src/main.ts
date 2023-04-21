import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

const logger = new Logger('AuthorizationMicroservice');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@rabbitmq:5672'],
      queue: 'authorization-queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  
  await app.listen();
  
  logger.log('Authorization Microservice has been started');
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const logger = new Logger('ProfileMicroservice');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@rabbitmq:5672'],
      queue: 'profile-queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.listen();
  
  logger.log('Profile Microservice has been started');
}
bootstrap();
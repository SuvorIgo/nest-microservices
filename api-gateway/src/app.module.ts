import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersController } from './controllers/users.controller';
import { AuthController } from './controllers/auth.controller';
import { ProfilesController } from './controllers/profiles.controller';
import { RolesController } from './controllers/roles.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from "@nestjs/config";
import * as dotenv from 'dotenv';
import { TestDataController } from './controllers/test-data.controller';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    JwtModule.register({
      secret: process.env.JWT_PRIVATE_KEY || "SECRET",
      signOptions: {
        expiresIn: '24h'
      }
    }),
    ClientsModule.register([
      {
        name: 'AUTHORIZATION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@rabbitmq:5672'],
          queue: 'authorization-queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'PROFILE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@rabbitmq:5672'],
          queue: 'profile-queue',
          queueOptions: {
            durable: false,
          }
        },
      },
    ]),
  ],
  controllers: [
    UsersController,
    AuthController,
    ProfilesController,
    RolesController,
    TestDataController,
  ],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ProfileController } from './controllers/profile.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profile } from './entities/profiles.entity';
import { AuthController } from './controllers/auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { TestDataController } from './controllers/test-data.controller';

dotenv.config();

@Module({
  imports: [
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
    ]),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'postgres',
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [
        Profile
      ],
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([Profile]),
  ],
  controllers: [
    ProfileController,
    AuthController,
    TestDataController,
  ],
  providers: [AppService],
})
export class AppModule {}

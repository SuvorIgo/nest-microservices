import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/entities/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Role } from 'src/entities/roles.entity';
import { UsersRoles } from 'src/entities/users-roles.entity';
import { RolesModule } from 'src/roles/roles.module';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_PRIVATE_KEY || "SECRET",
      signOptions: {
        expiresIn: '24h'
      }
    }),
    SequelizeModule.forFeature([User, Role, UsersRoles]),
    RolesModule,
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}

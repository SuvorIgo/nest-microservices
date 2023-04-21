import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from '../entities/roles.entity';
import { User } from 'src/entities/users.entity';
import { UsersRoles } from 'src/entities/users-roles.entity';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    SequelizeModule.forFeature([Role, User, UsersRoles]),
  ],
  exports: [
    RolesService
  ],
})
export class RolesModule {}

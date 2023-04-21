import { HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/entities/users.entity';
import { RolesService } from 'src/roles/roles.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

const logger = new Logger('MessageProcessing')

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private readonly userRepository: typeof User,
    private readonly roleService: RolesService,
    private jwtService: JwtService) {}

  async createUser(payload) {
    logger.log('{root: \'userReg\', cmd: \'createUser\'}');

    const user = await this.userRepository.create({...payload.dto, password: payload.hashPassword});
    const role = await this.roleService.getRoleByValue("USER");

    await user.$set('roles', [role.role_id]);

    user.roles = [role];

    return await this.userRepository.findByPk(user.user_id, {include: {all: true}});
  }

  async getAllUsers() {
    logger.log('{root: \'users\', cmd: \'getAll\'}');

    return await this.userRepository.findAll({include: {all: true}});
  }

  async getOneUser(id: number) {
    logger.log('{root: \'users\', cmd: \'getOne\'}');

    return await this.userRepository.findByPk(id, {include: {all: true}});
  }

  async updateUser(payload) {
    logger.log('{root: \'users\', cmd: \'update\'}');

    const user_id = payload.id;

    const user = await this.userRepository.update({...payload.dto, password: await bcrypt.hash(payload.dto.password, 3)}, {where: {user_id}});

    return user;
  }

  async removeUser(id: number) {
    logger.log('{root: \'users\', cmd: \'remove\'}');

    const user_id = id;

    return await this.userRepository.destroy({where: {user_id}});
  }

  async addRole(dto) {
    logger.log('{root: \'users\', cmd: \'addRole\'}');

    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);

    if (role && user) {
      await user.$add('role', role.role_id);
      return dto;
    }
    
    else 
      return new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
  }

  async getUserByLogin(login: string) {
    return await this.userRepository.findOne({where: {login}, include: {all: true}});
  }

  async validateUser(dto) {
    logger.log('{root: \'userAuth\', cmd: \'validate\'}');

    const user = await this.getUserByLogin(dto.login);
    console.log(dto.login);
    console.log(dto.password);

    if (user && await bcrypt.compare(dto.password, user.password)) 
      return user;

    else
      return undefined;
  }

  async generateToken(user) {
    logger.log('{root: \'userAuth\', cmd: \'gToken\'}');

    const payload = {login: user.login, id: user.user_id, roles: user.roles};

    return {
      token: await this.jwtService.signAsync(payload),
    }
  }

  async getUserByLoginReg(dto) {
    logger.log('{root: \'userReg\', cmd: \'getUserByLogin\'}');

    const login = dto.login;

    return await this.userRepository.findOne({where: {login}, include: {all: true}});
  }

  async createTestData() {
    logger.log('{root: \'test\', cmd: \'createUsers\'}');

    const createUserDto1 = {
      login: "admin",
      password: "$2y$10$P45wpyhDuRS.kGMDP3i.SOW947aSoFMj4tCl3xXaIhijbHpKsUyuK"
    }

    const createRoleDto1 = {
      value: "ADMIN",
      description: "Администратор",
    }

    const createRoleDto2 = {
      value: "USER",
      description: "Пользователь",
    }

    const roleOne = await this.roleService.createRole(createRoleDto1);
    const roleTwo = await this.roleService.createRole(createRoleDto2);

    const user = await this.userRepository.create(createUserDto1);

    const role = await this.roleService.getRoleByValue("ADMIN");

    await user.$set('roles', [role.role_id]);

    user.roles = [role];

    if (roleOne && roleTwo && user) 
      return true;
    else 
      return false;
  }
}

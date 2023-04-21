import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @MessagePattern({role: 'users', cmd: 'getAll'})
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @MessagePattern({role: 'users', cmd: 'getOne'})
  getOneUser(id: number) {
    return this.userService.getOneUser(id);
  }

  @MessagePattern({role: 'users', cmd: 'update'})
  updateUser(payload) {
    return this.userService.updateUser(payload);
  }

  @MessagePattern({role: 'users', cmd: 'remove'})
  removeUser(id: number) {
    return this.userService.removeUser(id);
  }

  @MessagePattern({role: 'users', cmd: 'addRole'})
  addRole(dto) {
    return this.userService.addRole(dto);
  }

  @MessagePattern({role: "userAuth", cmd: "validate"})
  validate(dto) {
    return this.userService.validateUser(dto);
  }

  @MessagePattern({role: "userAuth", cmd: "gToken"})  
  gToken(user) {
    return this.userService.generateToken(user);
  }
  
  @MessagePattern({role: "userReg", cmd: "getUserByLogin"})
  getUserByLogin(dto) {
    return this.userService.getUserByLoginReg(dto);
  }

  @MessagePattern({role: "userReg", cmd: "createUser"})
  createUser(payload) {
    return this.userService.createUser(payload);
  }

  @MessagePattern({role: "test", cmd: "createUsers"})
  createTestData() {
    return this.userService.createTestData();
  }
}

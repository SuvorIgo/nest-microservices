import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AddRoleDto } from './dtos/add-role.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { RegistrationUserDto } from './dtos/registration-user.dto';
import { CreateProfilesDto } from './dtos/create-profiles.dto';
import { UpdateProfilesDto } from './dtos/update-profiles.dto';
import { UpdateRoleDto } from './dtos/update-role.dto';
import { CreateRoleDto } from './dtos/create-role.dto';

@Injectable()
export class AppService {

  constructor(@Inject('AUTHORIZATION_SERVICE') private readonly clientAuth: ClientProxy,
    @Inject('PROFILE_SERVICE') private readonly clentProfile: ClientProxy) {}

  async onApplicationBootstrap() {
    await this.clientAuth.connect();
    await this.clentProfile.connect();
  }

  /// TEST ENDPOINT

  testData() {
    return this.clentProfile.send({role: "test", cmd: 'data'}, {});
  }

  /// USERS

  getAllUsers() {
    return this.clientAuth.send({role: 'users', cmd: 'getAll'}, {});
  }

  getOneUser(id: number) {
    return this.clientAuth.send({role: 'users', cmd: 'getOne'}, id)
  }

  updateUser(id: number, dto: UpdateUserDto) {
    return this.clientAuth.send({role: 'users', cmd: 'update'}, {id, dto});
  }

  removeUser(id: number) {
    return this.clientAuth.send({role: 'users', cmd: 'remove'}, id);
  }

  addRole(dto: AddRoleDto) {
    return this.clientAuth.send({role: 'users', cmd: 'addRole'}, dto);
  }

  /// AUTHORIZATION + REGISTRATION

  login(dto: CreateUserDto) {
    return this.clentProfile.send({role: 'auth', cmd: 'authorization'}, dto);
  }

  registration(dto: RegistrationUserDto) {
    return this.clentProfile.send({role: 'auth', cmd: 'registration'}, dto);
  }

  /// PROFiLES

  createProfile(dto: CreateProfilesDto) {
    return this.clentProfile.send({role: 'profiles', cmd: 'create'}, dto);
  }

  getAllProfiles() {
    return this.clentProfile.send({role: 'profiles', cmd: 'getAll'}, {});
  }

  getOneProfile(id: number) {
    return this.clentProfile.send({role: 'profiles', cmd: 'getOne'}, id);
  }

  updateProfile(id: number, dto: UpdateProfilesDto) {
    return this.clentProfile.send({role: 'profiles', cmd: 'update'}, {id, dto});
  }

  removeProfile(id: number) {
    return this.clentProfile.send({role: 'profiles', cmd: 'remove'}, id);
  }

  /// ROLES

  createRole(dto: CreateRoleDto) {
    return this.clientAuth.send({role: 'roles', cmd: 'create'}, dto);
  }

  getAllRoles() {
    return this.clientAuth.send({role: 'roles', cmd: 'getAll'}, {});
  }

  getRoleByValue(value: string) {
    return this.clientAuth.send({role: 'roles', cmd: 'getByValue'}, value)
  }

  updateRoleByValue(value: string, dto: UpdateRoleDto) {
    return this.clientAuth.send({role: 'roles', cmd: 'updateByValue'}, {value, dto});
  }

  removeRoleByValue(value: string) {
    return this.clientAuth.send({role: 'roles', cmd: 'removeByValue'}, value);
  }
}

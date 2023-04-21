import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { Profile } from './entities/profiles.entity';
import { InjectModel } from '@nestjs/sequelize';
import { ClientProxy } from '@nestjs/microservices';
import * as bcrypt from 'bcryptjs';

const logger = new Logger('MessageProcessing')

@Injectable()
export class AppService {
  
  constructor(@InjectModel(Profile) private readonly profileRepository: typeof Profile,
    @Inject('AUTHORIZATION_SERVICE') private readonly clientAuth: ClientProxy) {}

  async createProfile(dto) {
    logger.log('{root: \'profiles\', cmd: \'create\'}');

    return await this.profileRepository.create(dto);
  }

  async getAllProfiles() {
    logger.log('{root: \'profiles\', cmd: \'getAll\'}');

    return await this.profileRepository.findAll();
  }

  async getOneProfile(id: number) {
    logger.log('{root: \'profiles\', cmd: \'getOne\'}');

    return await this.profileRepository.findByPk(id);
  }

  async updateProfile(payload) {
    logger.log('{root: \'profiles\', cmd: \'update\'}');

    const profile_id = payload.id;

    return await this.profileRepository.update({...payload.dto}, {where: {profile_id}});
  }

  async removeProfile(id) {
    logger.log('{root: \'profiles\', cmd: \'remove\'}');

    const profile_id = id;

    return await this.profileRepository.destroy({where: {profile_id}});
  }

  async login(dto) {
    logger.log('{root: \'auth\', cmd: \'authorization\'}');

    const user = await this.clientAuth.send({role: "userAuth", cmd: "validate"}, dto).toPromise();
    console.log(user);

    if(user) {
      return await this.clientAuth.send({role: "userAuth", cmd: "gToken"}, user).toPromise();
    }
    else {
      return new HttpException(`Некорректный login или password`, HttpStatus.BAD_REQUEST);
    }
  }

  async registration(dto) {
    logger.log('{root: \'auth\', cmd: \'registration\'}');

    const candidate = await this.clientAuth.send({role: "userReg", cmd: "getUserByLogin"}, dto).toPromise();
    
    if(candidate) {
      return new HttpException(`Пользователь с таким login'ом уже существует`, HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(dto.password, 3);

    const user = await this.clientAuth.send({role: "userReg", cmd: "createUser"}, {dto, hashPassword}).toPromise();

    const profile = await this.createProfile({...dto, profile_id: user.user_id});

    user.profile = [profile];

    console.log(user);

    return await this.clientAuth.send({role: "userAuth", cmd: "gToken"}, user);
  }

  async testData() {
    logger.log('{root: \'test\', cmd: \'data\'}')

    const isCreateUsers = await this.clientAuth.send({role: "test", cmd: "createUsers"}, {}).toPromise();

    if (isCreateUsers)
      return HttpStatus.OK;
    else 
      return new HttpException("Что-то пошло не так", HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

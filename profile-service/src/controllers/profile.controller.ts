import { Controller, Get } from '@nestjs/common';
import { AppService } from '../app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ProfileController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({role: 'profiles', cmd: 'create'})
  createProfile(dto) {
    return this.appService.createProfile(dto);
  }

  @MessagePattern({role: 'profiles', cmd: 'getAll'})
  getAllProfiles() {
    return this.appService.getAllProfiles();
  }

  @MessagePattern({role: 'profiles', cmd: 'getOne'})
  getOneProfile(id: number) {
    return this.appService.getOneProfile(id);
  }

  @MessagePattern({role: 'profiles', cmd: 'update'})
  updateProfile(payload) {
    return this.appService.updateProfile(payload);
  }

  @MessagePattern({role: 'profiles', cmd: 'remove'})
  removeProfile(id: number) {
    return this.appService.removeProfile(id);
  }
}

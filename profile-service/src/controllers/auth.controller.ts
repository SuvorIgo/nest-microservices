import { Controller, Get } from '@nestjs/common';
import { AppService } from '../app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({role: 'auth', cmd: 'authorization'})
  login(dto) {
    return this.appService.login(dto);
  }

  @MessagePattern({role: 'auth', cmd: 'registration'})
  registration(dto) {
    return this.appService.registration(dto);
  }
}

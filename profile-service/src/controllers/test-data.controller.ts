import { Controller, Get } from '@nestjs/common';
import { AppService } from '../app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class TestDataController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({role: "test", cmd: 'data'})
  async test() {
    return await this.appService.testData();
  }
}

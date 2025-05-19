import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// Defines root (/) and /ping endpoints
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('ping')
  ping(): string {
    return 'Pong!';
  }
}

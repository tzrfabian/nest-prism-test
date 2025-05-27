import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

// Defines root (/) and /ping endpoints
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Get a greeting message',
    description: 'This endpoint returns a simple greeting message.'
  })
  @ApiResponse({
    status: 200,
    description: 'Greeting message returned successfully.',
  })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({
    summary: 'Ping the server',
    description: 'This endpoint checks if the server is running.'
  })
  @ApiResponse({
    status: 200,
    description: 'Server is running.',
    
  })
  @Get('ping')
  ping(): string {
    return 'Pong!';
  }
}

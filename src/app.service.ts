import { Injectable } from '@nestjs/common';

// Returns 'Hello World!' for root endpoint
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

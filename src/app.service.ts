import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from './security/middleware/authGuard.middleware';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }
}

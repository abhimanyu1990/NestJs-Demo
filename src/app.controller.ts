import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './security/middleware/authGuard.middleware';
import { Authority } from './security/authority.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard)
  @Authority('CREATE_USER')
  getHello(): string {
    return this.appService.getHello();
  }
}

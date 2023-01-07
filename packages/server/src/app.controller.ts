import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  @ApiTags('account')
  async login() {}

  @Post('logout')
  @ApiTags('account')
  async logout() {}

  @Post('authentication')
  @ApiTags('account')
  async authentication() {}
}

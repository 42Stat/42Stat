import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { LoginDto } from './dto/login.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    this.appService.seed();
  }

  @Post('login')
  @ApiTags('account')
  async login(@Body() loginDto: LoginDto): Promise<boolean> {
    return this.appService.login(loginDto);
  }

  @Post('logout')
  @ApiTags('account')
  async logout() {}

  @Post('end-point')
  @ApiTags('account')
  async authentication() {}
}

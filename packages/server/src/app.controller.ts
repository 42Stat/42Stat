import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { LoginDto } from './auth/dto/login.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    this.appService.seed();
  }
}

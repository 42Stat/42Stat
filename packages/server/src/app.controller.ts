import { Controller, Delete, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    this.appService.seed();
  }

  @Delete('/reset')
  @ApiTags('db')
  async reset() {
    await this.appService.reset();
  }

  @Post('/seed')
  @ApiTags('db')
  async seed() {
    await this.appService.seed();
  }
}

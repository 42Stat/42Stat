import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  @ApiTags('account')
  async login(
    @Res() res: Response,
    @Body() loginDto: LoginDto
  ): Promise<boolean> {
    return this.authService.login(res, loginDto);
  }

  @Post('logout')
  @ApiTags('account')
  async logout() {}

  @Post('end-point')
  @ApiTags('account')
  async authentication() {}
}

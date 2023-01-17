import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

class Ref {
  @ApiProperty()
  refreshToken: string;
}

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

  @Post('login-test')
  @ApiTags('account')
  async loginTest(
    @Res() res: Response,
    @Body() loginDto: LoginDto
  ): Promise<boolean> {
    return await this.authService.loginTest(res);
  }

  @Post('logout')
  @ApiTags('account')
  async logout() {}

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('token')
  @ApiTags('account')
  @ApiBody({ type: Ref })
  async token(@Req() req: Request, @Res() res: Response) {
    await this.authService.tokenRefresh(req, res);
    return;
  }

  @Post('ft-oauth')
  @ApiTags('account')
  async authentication() {}
}

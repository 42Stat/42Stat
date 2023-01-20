import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { CookieOptions, Request, Response } from 'express';
import { frontendURL } from 'src/main';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Payload } from './payload.decorator';

class Ref {
  @ApiProperty()
  refreshToken: string;
}

const accessTokenHeaderKey = 'Authorization';
const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  path: '/',
  // TODO: domain
  // domain: `${process.env.DOMAIN_URL}`,
  sameSite: 'none',
};

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiTags('account')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() loginDto: LoginDto
  ): Promise<boolean> {
    const { accessToken, body } = await this.authService.login(loginDto);
    res.cookie(accessTokenHeaderKey, accessToken, cookieOptions);
    return body;
  }

  @Post('login-test')
  @ApiTags('account')
  async loginTest(@Res({ passthrough: true }) res: Response): Promise<any> {
    const { accessToken, body } = await this.authService.loginTest();
    res.cookie(accessTokenHeaderKey, accessToken, cookieOptions);
    return body;
  }

  @Post('logout')
  @ApiTags('account')
  async logout() {
    return;
  }

  @Post('token')
  @ApiTags('account')
  @ApiBody({ type: Ref })
  @UseGuards(AuthGuard('jwt-refresh'))
  async tokenRefresh(
    @Payload() payload: any,
    @Res({ passthrough: true }) res: Response
  ) {
    const accessToken = await this.authService.tokenRefresh(payload);
    res.cookie(accessTokenHeaderKey, accessToken, cookieOptions);
    return;
  }

  @Get('ft-oauth')
  @ApiTags('account')
  @UseGuards(AuthGuard('ft-oauth'))
  async ftOAuth(@Req() req: Request) {
    return req.user;
  }

  @Get('ft-oauth/callback')
  @ApiTags('account')
  @UseGuards(AuthGuard('ft-oauth'))
  async ftOAuthRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const { user } = req;
    const accessToken: string | undefined = req.cookies[accessTokenHeaderKey];
    // todo: check undefined here, redirect to frontend page manually
    const newAccessToken = await this.authService.ftOAuthRedirect(
      accessToken,
      user['id']
    );
    res.cookie(accessTokenHeaderKey, newAccessToken, cookieOptions);
    res.redirect(frontendURL);
    return;
  }
}

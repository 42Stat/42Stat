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
import { ApiTags } from '@nestjs/swagger';
import { CookieOptions, Request, Response } from 'express';
import { AuthService, RefreshTokenPayload } from './auth.service';
import {
  LoginRequestDto,
  LoginResponseDto,
  TokenRefreshDto,
} from './dto/login.dto';
import { Payload } from './payload.decorator';

const frontendURL = process.env.FRONTEND_URL;
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
    @Body() loginDto: LoginRequestDto
  ): Promise<LoginResponseDto> {
    const { accessToken, body } = await this.authService.login(loginDto);
    res.cookie(accessTokenHeaderKey, accessToken, cookieOptions);
    return body;
  }

  // @Post('login-test')
  // @ApiTags('account')
  // async loginTest(@Res({ passthrough: true }) res: Response): Promise<any> {
  //   const { accessToken, body } = await this.authService.loginTest();
  //   res.cookie(accessTokenHeaderKey, accessToken, cookieOptions);
  //   return body;
  // }

  @Post('logout')
  @ApiTags('account')
  async logout() {
    return;
  }

  @Post('token')
  @ApiTags('account')
  @UseGuards(AuthGuard('jwt-refresh'))
  async tokenRefresh(
    @Payload() payload: RefreshTokenPayload,
    @Body() body: TokenRefreshDto,
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
    const accessToken: string | undefined = req?.cookies[accessTokenHeaderKey];
    // TODO: check undefined here, redirect to frontend page manually

    try {
      const newAccessToken = await this.authService.ftOAuthRedirect(
        accessToken,
        user['id']
      );
      res.cookie(accessTokenHeaderKey, newAccessToken, cookieOptions);
      res.redirect(frontendURL);
    } catch (error) {
      res.clearCookie(accessTokenHeaderKey, cookieOptions);
      res.redirect(`${frontendURL}/logout`);
    }
  }
}

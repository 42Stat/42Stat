import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { OAuth2Client } from 'google-auth-library';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

const googleOAuthClient = new OAuth2Client(
  process.env.GOOGLE_IDENTITY_CLIENT_ID
);

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private usersService: UsersService
  ) {}

  async validateUser(googleId: number) {
    const user = await this.usersService.getUserByGoogleId(googleId);
    // If user is not found, throw Forbidden(403)
    if (!user) throw new ForbiddenException();
  }

  async login(res: Response, loginDto: LoginDto): Promise<any> {
    try {
      // const ticket = await googleOAuthClient.verifyIdToken({
      //   idToken: loginDto.credential,
      //   audience: loginDto.clientId,
      // });
      // const payload = ticket.getPayload();
      // const googleId = parseInt(payload['sub']);
      // const user = await this.usersService.getUserByGoogleId(googleId);
      const user = await this.usersService.getUserByIntraId(1);
      const accessToken = this.jwtService.sign(
        {
          // googleId: googleId,
          intraId: user ? user.id : null,

          // intraId: user ? user.intra.id : null,
          needOfFtOAuth: user ? false : true,
        },
        {
          expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}m`,
          secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        }
      );
      const refreshToken = this.jwtService.sign(
        {
          // googleId: googleId,
          // intraId: user ? user.intra.id : null,
          intraId: user ? user.id : null,
          needOfFtOAuth: user ? false : true,
        },
        {
          expiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME}d`,
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        }
      );
      console.log(accessToken);
      console.log(refreshToken);
      // TODO: 디비에 저장 + 페이로드에 뭐 넣을 지 고민
      res.cookie('access_token', accessToken, { httpOnly: true, secure: true });
      return { refreshToken: refreshToken, needFtOAuth: user ? false : true };
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }
}

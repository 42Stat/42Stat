import {
  BadRequestException,
  ConsoleLogger,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { OAuth2Client } from 'google-auth-library';
import { Request, Response } from 'express';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';

const googleOAuthClient = new OAuth2Client(
  process.env.GOOGLE_IDENTITY_CLIENT_ID
);
const headerName = 'Authorization';

type AccessTokenPayload = {
  googleId: number;
  intraId: number;
  needOfFtOAuth: boolean;
};
type RefreshTokenPayload = {
  googleId: number;
  expirationTime: number;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private usersService: UsersService
  ) {}

  // ANCHOR: validate
  async validateUser(googleId: number) {
    const user = await this.usersService.getUserByGoogleId(googleId);
    // If user is not found, throw Forbidden(403)
    if (!user) throw new ForbiddenException();
  }

  async validateUserTest(intraId: number) {
    const user = await this.usersService.getUserByIntraId(intraId);
    // If user is not found, throw Forbidden(403)
    if (!user) throw new ForbiddenException();
  }

  // ANCHOR: login
  async verifyGoogleCredential(loginDto: LoginDto): Promise<number> {
    const ticket = await googleOAuthClient.verifyIdToken({
      idToken: loginDto.credential,
      audience: loginDto.clientId,
    });
    const payload = ticket.getPayload();
    if (!payload || !payload['sub']) throw new BadRequestException();
    const googleId = parseInt(payload['sub']);
    return googleId;
  }

  isValidRefreshToken(payload: RefreshTokenPayload): boolean {
    return payload && payload['expirationTime'] > Date.now();
  }

  async login(res: Response, loginDto: LoginDto): Promise<any> {
    try {
      const googleId = await this.verifyGoogleCredential(loginDto);
      // TODO: 첫 로그인인 경우, Intra가 없어서 터질 수도 있음
      const user = await this.usersService.getUserByGoogleId(googleId);
      let storedRefreshTokenPayload: RefreshTokenPayload = null;

      if (user !== null) {
        // Check if user is active
        if (user.intra.active === false) throw new UnauthorizedException();
        // Check if user has refresh token
        if (user.refreshToken) {
          const jwtVerifyOptions: JwtVerifyOptions = {
            secret: process.env.JWT_REFRESH_TOKEN_SECRET,
          };
          storedRefreshTokenPayload = this.jwtService.verify(
            user.refreshToken,
            jwtVerifyOptions
          );
        }
      }

      const accessTokenPayload: AccessTokenPayload = {
        googleId: googleId,
        intraId: user?.intra.id,
        needOfFtOAuth: null,
      };
      const accessTokenOptions: JwtSignOptions = {
        expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}m`,
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      };
      const accessToken = this.jwtService.sign(
        accessTokenPayload,
        accessTokenOptions
      );

      let refreshToken = '';
      // TODO: Refresh token 만료 시간이 지났을 때만 새로 발급(작동 확인 필요)
      if (this.isValidRefreshToken(storedRefreshTokenPayload)) {
        refreshToken = user.refreshToken;
      } else {
        const refreshTokenPayload: RefreshTokenPayload = {
          googleId: googleId,
          expirationTime:
            Date.now() +
            parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME),
        };
        const refreshTokenOptions: JwtSignOptions = {
          expiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME}d`,
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        };
        refreshToken = this.jwtService.sign(
          refreshTokenPayload,
          refreshTokenOptions
        );
        // TODO: 디비에 저장
        // if (user) await this.usersService.updateUser(user);
      }
      // TODO: for test
      console.log(`Bearer ${accessToken}`);

      res.cookie('Authentication', accessToken, {
        httpOnly: true,
        secure: true,
        path: '/',
        domain: `${process.env.DOMAIN_URL}`,
      });
      return { refreshToken: refreshToken, needFtOAuth: user ? false : true };
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async loginTest(res: Response): Promise<any> {
    try {
      const user = await this.usersService.getUserByIntraId(99733);
      const accessToken = this.jwtService.sign(
        {
          googleId: 1,
          intraId: user.id,
          needOfFtOAuth: false,
        },
        {
          expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}s`,
          secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        }
      );
      const refreshToken = this.jwtService.sign(
        {
          googleId: 1,
          intraId: user.id,
          needOfFtOAuth: false,
        },
        {
          expiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME}d`,
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        }
      );
      res.cookie(headerName, `Bearer ${accessToken}`, {
        httpOnly: true,
        secure: true,
      });
      console.log(`Bearer ${accessToken}`);
      console.log(`${refreshToken}`);
      return { refreshToken: refreshToken, needFtOAuth: false };
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  // ANCHOR: refresh token
  async tokenRefresh(req: Request, res: Response) {
    const googldId = req.user['googleId'];
    const user = await this.usersService.getUserByGoogleId(googldId);
    // if (!user) throw new UnauthorizedException();

    const accessTokenPayload: AccessTokenPayload = {
      googleId: googldId,
      intraId: user?.intra.id,
      needOfFtOAuth: null,
    };
    const accessTokenOptions: JwtSignOptions = {
      expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}m`,
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    };
    const accessToken = this.jwtService.sign(
      accessTokenPayload,
      accessTokenOptions
    );

    res.cookie(headerName, `Bearer ${accessToken}`, {
      httpOnly: true,
      secure: true,
      path: '/',
      domain: `${process.env.DOMAIN_URL}`,
    });
    return;
  }
}

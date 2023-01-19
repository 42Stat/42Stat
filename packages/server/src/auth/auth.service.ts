import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { OAuth2Client } from 'google-auth-library';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { User } from '../users/entity/user.entity';

const googleOAuthClient = new OAuth2Client(
  process.env.GOOGLE_IDENTITY_CLIENT_ID
);

const accessTokenOptions: JwtSignOptions = {
  expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}m`,
  secret: process.env.JWT_ACCESS_TOKEN_SECRET,
};

type AccessTokenPayload = {
  googleId: string;
  intraId: number;
  needOfFtOAuth: boolean;
};
type RefreshTokenPayload = {
  googleId: string;
  expirationTime: number;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private usersService: UsersService
  ) {}

  // ANCHOR: validate
  async validateUser(googleId: string) {
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
  async verifyGoogleCredential(loginDto: LoginDto): Promise<string> {
    const ticket = await googleOAuthClient.verifyIdToken({
      idToken: loginDto.credential,
      audience: loginDto.clientId,
    });
    const payload = ticket.getPayload();
    if (!payload || !payload['sub']) throw new BadRequestException();
    const googleId = String(payload['sub']);
    return googleId;
  }

  isValidRefreshToken(payload: RefreshTokenPayload): boolean {
    return payload && payload['expirationTime'] > Date.now();
  }

  async login(loginDto: LoginDto): Promise<any> {
    let user: User;
    let googleId: string;
    let storedRefreshTokenPayload: RefreshTokenPayload = null;
    try {
      googleId = await this.verifyGoogleCredential(loginDto);
      console.log('******' + googleId);
      // TODO: 첫 로그인인 경우, Intra가 없어서 터질 수도 있음
      user = await this.usersService.getUserByGoogleId(googleId);
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }

    if (user !== null) {
      // Check if user is active
      try {
        if (user.intra?.active === false) throw new Error('User is not active');
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
      } catch (error) {
        console.log(error);
        throw new UnauthorizedException();
      }
    } else {
      user = {
        id: googleId,
        accessToken: null,
        refreshToken: null,
        intra: null,
      };
    }

    const accessTokenPayload: AccessTokenPayload = {
      googleId: googleId,
      intraId: user.intra ? user.intra.id : null,
      needOfFtOAuth: null,
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
          Date.now() + parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME),
      };
      const refreshTokenOptions: JwtSignOptions = {
        expiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME}d`,
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      };
      refreshToken = this.jwtService.sign(
        refreshTokenPayload,
        refreshTokenOptions
      );
      // TODO: 디비에 저장 / 유저가 아니면 생성, 유저면 업데이트
      user.refreshToken = refreshToken;
      console.log(user);
      console.log('here ' + (await this.usersService.saveUser(user)));
      // 트랜잭션 처리 필요 / 실패하면?
      // if (user) await this.usersService.updateUser(user);
    }
    // TODO: for test
    console.log(`Bearer ${accessToken}`);

    return {
      accessToken: accessToken,
      body: {
        refreshToken: refreshToken,
        needFtOAuth: user?.intra ? false : true,
      },
    };
  }

  async loginTest(): Promise<any> {
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

      console.log(`Bearer ${accessToken}`);
      console.log(`${refreshToken}`);
      return {
        accessToken: accessToken,
        body: { refreshToken: refreshToken, needFtOAuth: false },
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  // ANCHOR: refresh token
  async tokenRefresh(payload: any) {
    const googldId = payload?.googleId;
    const user = await this.usersService.getUserByGoogleId(googldId);
    if (user === null) throw new BadRequestException();
    if (user.intra?.active === false) throw new UnauthorizedException();

    const accessTokenPayload: AccessTokenPayload = {
      googleId: googldId,
      intraId: user.intra?.id,
      needOfFtOAuth: null,
    };
    const accessToken = this.jwtService.sign(
      accessTokenPayload,
      accessTokenOptions
    );

    return accessToken;
  }

  async ftOAuthRedirect(req: any) {
    const accessToken = req.cookies['Authorization'];
    const jwtVerifyOptions: JwtVerifyOptions = {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    };
    let accessTokenPayload: AccessTokenPayload;
    try {
      accessTokenPayload = this.jwtService.verify(
        accessToken,
        jwtVerifyOptions
      );
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
    const googleId: string = accessTokenPayload.googleId;
    const intraId: number = req.user.id;
    const user = await this.usersService.getUserByGoogleId(googleId);

    user.intra.id = intraId;
    await this.usersService.saveUser(user);

    return accessToken;
  }
}

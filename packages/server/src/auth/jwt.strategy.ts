import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

type AccessTokenPayload = {
  googleId: number;
  intraId: number;
  needOfFtOAuth: boolean;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly jwtService: JwtService,
    private authService: AuthService
  ) {
    super({
      // jwtFromRequest: cookieExtractor,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
      // TODO: Check after set up the audience
      // audience: process.env.JWT_ACCESS_TOKEN_AUDIENCE,
    });
  }

  // TODO: Passport에서 우선적으로 verify를 하는 지 확인 필요(실패시 401?)
  async validate(payload: AccessTokenPayload): Promise<AccessTokenPayload> {
    // const user = this.authService.validateUser(payload.googleId);
    // TODO: For test
    if (payload.googleId == null) throw new ForbiddenException();
    this.authService.validateUserTest(payload.intraId);
    return payload;
  }
}

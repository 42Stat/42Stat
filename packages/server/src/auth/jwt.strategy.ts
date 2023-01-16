import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly jwtService: JwtService,
    private authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
      // TODO: Check after set up the audience
      // audience: process.env.JWT_ACCESS_TOKEN_AUDIENCE,
    });
  }

  // TODO: Passport에서 우선적으로 verify를 하는 지 확인 필요(실패시 401?)
  async validate(payload: any): Promise<any> {
    this.authService.validateUser(parseInt(payload.googleId));
    return { googleId: payload.googleId, intraId: payload.intraId };
  }
}

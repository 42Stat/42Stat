import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42';
import { AuthService } from './auth.service';

@Injectable()
export class FtOAuthStrategy extends PassportStrategy(Strategy, 'ft-oauth') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.FT_OAUTH_CLIENT_ID,
      clientSecret: process.env.FT_OAUTH_CLIENT_SECRET,
      callbackURL: process.env.FT_OAUTH_CALLBACK_URL,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    return profile;
  }
}

import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

export class FTOAuthStrategy extends PassportStrategy(Strategy, 'ft-oauth') {
  constructor() {
    super({
      // clientID: process.env.FT_OAUTH_CLIENT_ID,
      // clientSecret: process.env.FT_OAUTH_CLIENT_SECRET,
      // callbackURL: process.env.FT_OAUTH_CALLBACK_URL,
    });
  }

  async validate(accessToken: string) {
    // TODO: accessToken으로 유저 정보 가져오기
    // return user;
  }
}

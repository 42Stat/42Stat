import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { LoginDto } from './dto/login.dto';

const googleOAuthClient = new OAuth2Client(
  process.env.GOOGLE_IDENTITY_CLIENT_ID
);

@Injectable()
export class AppService {
  async login(loginDto: LoginDto): Promise<boolean> {
    try {
      const ticket = await googleOAuthClient.verifyIdToken({
        idToken: loginDto.credential,
        audience: loginDto.clientId,
      });
      const payload = ticket.getPayload();
      const userid = payload['sub'];
      console.log('id: ' + userid);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }

    // DB에 저장할 것것
    // google id
    // access token
    // refresh token
    // user_id
  }
}

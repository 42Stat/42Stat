import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty()
  credential: string;
  @ApiProperty()
  clientId: string;
}

export class LoginResponseDto {
  @ApiProperty()
  needFtOAuth: boolean;
  @ApiProperty()
  refreshToken: string;
}

export class TokenRefreshDto {
  @ApiProperty()
  refreshToken: string;
}

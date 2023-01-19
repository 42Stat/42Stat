import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  credential: string;
  @ApiProperty()
  clientId: string;
}

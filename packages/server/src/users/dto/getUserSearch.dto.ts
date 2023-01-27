import { ApiProperty } from '@nestjs/swagger';
import { IntraUser } from '../entity/intraUser.entity';

export class GetUserSearchDto {
  constructor(user: IntraUser) {
    this.id = user.id;
    this.imageUrl = user.imageUrl;
    this.login = user.login;
  }
  @ApiProperty()
  id: number;
  @ApiProperty()
  imageUrl: string;
  @ApiProperty()
  login: string;
}

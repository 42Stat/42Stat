import { ApiProperty } from '@nestjs/swagger';

export class UserProfileCoalitionDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  image: string;
  @ApiProperty()
  color: string;
}

export class GetUserProfileDto {
  @ApiProperty()
  image: string;
  @ApiProperty()
  login: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  rank: number;
  @ApiProperty()
  level: number;
  @ApiProperty()
  grade: string;
  @ApiProperty()
  coalition: UserProfileCoalitionDto;
  @ApiProperty()
  startedAt: string;
  @ApiProperty()
  daysSinceStarted: number;
  @ApiProperty()
  blackholedAt: string;
  @ApiProperty()
  daysUntilBlackholed: number;
}

import { ApiProperty } from '@nestjs/swagger';

export class UserProfileCoalitionDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  image: string;
  @ApiProperty()
  color: string;
}

export class GetUserProfileDto {
  @ApiProperty()
  id: number;
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
  startedAt: Date;
  @ApiProperty()
  daysSinceStarted: number;
  @ApiProperty({ nullable: true })
  blackholedAt: Date;
  @ApiProperty({ nullable: true })
  daysUntilBlackholed: number;
}

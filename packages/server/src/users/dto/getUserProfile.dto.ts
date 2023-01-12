import { ApiProperty } from '@nestjs/swagger';
import { IntraUser } from '../entity/intraUser.entity';
import { Title } from '../entity/title.entity';

export class UserProfileCoalitionDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  imageUrl: string;
  @ApiProperty()
  color: string;
}

export class GetUserProfileDto {
  constructor(user: IntraUser, title: Title, rank: number) {
    this.id = user.id;
    this.imageUrl = user.imageUrl;
    this.login = title ? title.name.replace('%login', user.login) : user.login;
    this.name = user.displayName;
    this.rank = rank;
    this.level = user.level;
    this.grade = user.grade;
    this.coalition = user.coalition;
    this.startedAt = user.beginAt;
    this.daysSinceStarted = Math.floor(
      (new Date().getTime() - user.beginAt.getTime()) / 86400000
    );
    this.blackholedAt = user.blackholedAt;
    this.daysUntilBlackholed = user.blackholedAt
      ? Math.floor(
          (user.blackholedAt.getTime() - new Date().getTime()) / 86400000
        )
      : null;
  }
  @ApiProperty()
  id: number;
  @ApiProperty()
  imageUrl: string;
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

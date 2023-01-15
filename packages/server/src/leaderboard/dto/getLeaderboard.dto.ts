import { ApiProperty } from '@nestjs/swagger';
import { IntraUser } from '../../users/entity/intraUser.entity';

export class GetLeaderboardDto {
  constructor(user: IntraUser) {
    this.id = user.id;
    this.login = user.login;
    this.level = user.level;
    this.totalCoalitionScore = user.totalCoalitionScore;
    this.totalEvaluationCount = user.totalEvaluationCount;
    this.passedSubjectCount = user.passedSubjectCount;
    this.link = `https://localhost:11900/profile/${user.login}`;
  }
  @ApiProperty()
  id: number;
  @ApiProperty()
  login: string;
  @ApiProperty()
  level: number;
  @ApiProperty()
  totalCoalitionScore: number;
  @ApiProperty()
  totalEvaluationCount: number;
  @ApiProperty()
  passedSubjectCount: number;
  @ApiProperty()
  link: string;
}

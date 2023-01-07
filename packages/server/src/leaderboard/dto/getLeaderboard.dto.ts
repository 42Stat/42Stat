import { ApiProperty } from '@nestjs/swagger';

export class GetLeaderboardDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  login: string;
  @ApiProperty()
  level: number;
  @ApiProperty()
  coalitionScore: number;
  @ApiProperty()
  totalEvaluationCount: number;
  @ApiProperty()
  passedSubjectCount: number;
  @ApiProperty()
  link: string;
}

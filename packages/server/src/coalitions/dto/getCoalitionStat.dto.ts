import { ApiProperty } from '@nestjs/swagger';

export class GetCoalitionStatDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  image: string;
  @ApiProperty()
  color: string;
  @ApiProperty()
  score: number;
  @ApiProperty()
  activeUserCount: number;
  @ApiProperty()
  passedSubjectCount: number;
  @ApiProperty()
  evaluationCount: number;
  @ApiProperty()
  blackholedUserCount: number;
  @ApiProperty()
  link: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { Coalition } from '../entity/coalition.entity';

export class GetCoalitionDto {
  constructor(coalition: Coalition, score: number) {
    this.id = coalition.id;
    this.name = coalition.name;
    this.image = coalition.imageUrl;
    this.color = coalition.color;
    this.score = score;
    this.activeUserCount = coalition.activeUserCount;
    this.passedSubjectCount = coalition.subjectPassedCount;
    this.evaluationCount = coalition.evaluationCount;
    this.blackholedUserCount = coalition.blackholedUserCount;
    this.link = '';
  }
  @ApiProperty()
  id: number;
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

export class GetCoalitionsDto {
  @ApiProperty()
  gun: GetCoalitionDto;
  @ApiProperty()
  gon: GetCoalitionDto;
  @ApiProperty()
  gam: GetCoalitionDto;
  @ApiProperty()
  lee: GetCoalitionDto;
}

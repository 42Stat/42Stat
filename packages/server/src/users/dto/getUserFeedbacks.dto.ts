import { ApiProperty } from '@nestjs/swagger';
import { Evaluation } from '../../subjects/entity/evaluation.entity';

export class GetUserFeedbackDto {
  constructor(evaluation: Evaluation) {
    const flags: string[] = [
      'Ok', // 1
      'Empty work', // 2
      'Incomplete work', // 3
      'No Author file', // 4
      'Invalid colpilation', // 5
      'Norme', // 6
      'Cheat', // 7
      'Crash', // 8
      'Outstanding project', // 9
      '', // 10
      '', // 11
      'Leaks', // 12
      'Forbidden Function', // 13
    ];
    this.id = evaluation.id;
    this.corrector = evaluation.corrector.login;
    this.corrected = evaluation.team.users.map((user) => user.intra.login);
    this.beginAt = evaluation.beginAt;
    this.subject = evaluation.team.project.subject.name;
    this.positive = evaluation.positive;
    this.flagName = flags[evaluation.flag - 1];
    this.mark = evaluation.finalMark;
    this.comment = evaluation.comment;
    this.rate = evaluation.rating;
    this.feedback = evaluation.feedback;
  }
  @ApiProperty()
  id: number;
  @ApiProperty()
  corrector: string;
  @ApiProperty()
  corrected: string[];
  @ApiProperty()
  beginAt: Date;
  @ApiProperty()
  subject: string;
  @ApiProperty()
  positive: boolean;
  @ApiProperty()
  flagName: string;
  @ApiProperty()
  mark: number;
  @ApiProperty()
  comment: string;
  @ApiProperty()
  rate: number;
  @ApiProperty()
  feedback: string;
}

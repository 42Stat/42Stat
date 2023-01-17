import { ApiProperty } from '@nestjs/swagger';
import { CorrectedStat } from '../entity/correctedStat.entity';
import { CorrectorStat } from '../entity/correctorStat.entity';
import { IntraUser } from '../entity/intraUser.entity';
import { SubjectStat } from '../entity/subjectStat.entity';

export class GetOverallDto {
  constructor(
    user: IntraUser,
    rank: number,
    totalEvaluationCount: number,
    coalitionScoreRank: number
  ) {
    this.rank = rank;
    this.level = user.level;
    this.wallet = user.wallet;
    this.correctionPoint = user.correctionPoint;
    this.totalEvaluationCount = totalEvaluationCount;
    this.coalitionPointRank = coalitionScoreRank;
    this.totalCoalitionPoint = user.totalCoalitionScore;
  }
  @ApiProperty()
  rank: number;
  @ApiProperty()
  level: number;
  @ApiProperty()
  wallet: number;
  @ApiProperty()
  correctionPoint: number;
  @ApiProperty()
  totalEvaluationCount: number;
  @ApiProperty()
  coalitionPointRank: number;
  @ApiProperty()
  totalCoalitionPoint: number;
}

export class GetCorrectionStatDto {
  constructor(stat: CorrectedStat | CorrectorStat) {
    this.averageMark = stat.averageMark;
    this.averageEvaluationCount = stat.averageEvaluationCount;
    this.totalEvaluationCount = stat.evaluationCount;
    const averageBeginTime = stat.averageBeginTime / 1000 / 60 / 60;
    if (averageBeginTime > 6 && averageBeginTime < 12)
      this.preferedTime = 'Morning';
    else if (averageBeginTime < 18) this.preferedTime = 'Afternoon';
    else if (averageBeginTime < 22) this.preferedTime = 'Evening';
    else this.preferedTime = 'Night';
    this.averageDuration = Math.floor(stat.averageDuration / 1000 / 60);
    if (stat instanceof CorrectedStat)
      this.averageFeedbackLength = stat.averageFeedbackLength;
    else this.averageFeedbackLength = stat.averageCommentLength;
    this.totalOutstandingCount = stat.outstandingCount;
  }
  @ApiProperty()
  averageMark: number;
  @ApiProperty()
  averageEvaluationCount: number; // per month
  @ApiProperty()
  totalEvaluationCount: number;
  @ApiProperty()
  preferedTime: string;
  @ApiProperty()
  averageDuration: number;
  @ApiProperty()
  averageFeedbackLength: number;
  @ApiProperty()
  totalOutstandingCount: number;
}

class LastClearedSubjectDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  finalMark: number;
  @ApiProperty()
  daysAfterCleared: number;
}

export class GetSubjectStatDto {
  constructor(stat: SubjectStat) {
    this.averageFinalMark = stat.averageFinalMark;
    this.averageRetry = stat.totalRetryCount / stat.passedCount;
    this.averageClearTime = stat.averageClearTime / 1000 / 60;
    this.totalRetry = stat.totalRetryCount;
    this.lastClearedSubject = {
      name: stat.lastProject.subject.name,
      finalMark: stat.lastProject.finalMark,
      daysAfterCleared: Math.floor(
        (Date.now() - stat.lastProject.markedAt.getTime()) / 1000 / 60 / 60 / 24
      ),
    };
    this.passedSubjectCount = stat.passedCount;
  }
  @ApiProperty()
  averageFinalMark: number;
  @ApiProperty()
  averageRetry: number; // per subject
  @ApiProperty()
  averageClearTime: number; // per subject
  @ApiProperty()
  totalRetry: number;
  @ApiProperty()
  lastClearedSubject: LastClearedSubjectDto;
  @ApiProperty()
  passedSubjectCount: number;
}

export class GetUserSummaryDto {
  @ApiProperty()
  overall: GetOverallDto;
  @ApiProperty()
  correctorStat: GetCorrectionStatDto;
  @ApiProperty()
  correctedStat: GetCorrectionStatDto;
  @ApiProperty()
  subjectStat: GetSubjectStatDto;
}

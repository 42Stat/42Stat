import { ApiProperty } from '@nestjs/swagger';

export class GetOverallDto {
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
  @ApiProperty()
  averageFinalMark: number;
  @ApiProperty()
  averageRetry: number; // per subject
  @ApiProperty()
  averageClearTime: string; // per subject
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

import { ApiProperty } from '@nestjs/swagger';

export class GetUserFeedbackDto {
  @ApiProperty()
  corrector: string;
  @ApiProperty()
  corrected: string;
  @ApiProperty()
  beginAt: string;
  @ApiProperty()
  subject: string;
  @ApiProperty()
  flag: number;
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

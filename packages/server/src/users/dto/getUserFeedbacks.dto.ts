import { ApiProperty } from '@nestjs/swagger';

export class GetUserFeedbackDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  corrector: string;
  @ApiProperty()
  corrected: string;
  @ApiProperty()
  beginAt: string;
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

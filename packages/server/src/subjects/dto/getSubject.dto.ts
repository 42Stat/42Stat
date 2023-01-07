import { ApiProperty } from '@nestjs/swagger';

export class GetSubjectDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  finalMark: number;
  @ApiProperty()
  retryCount: number;
  @ApiProperty()
  clearTime: number;
  @ApiProperty()
  isPassed: boolean;
  @ApiProperty()
  link: string;
}

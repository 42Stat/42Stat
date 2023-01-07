import { ApiProperty } from '@nestjs/swagger';

export class GetSubjectDto {
  @ApiProperty()
  id: number;
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

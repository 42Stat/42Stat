import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SwaggerEnumType } from '@nestjs/swagger/dist/types/swagger-enum.type';
import { GetSubjectDto } from './dto/getSubject.dto';
import { SubjectsService } from './subjects.service';

const subjectsSortOptions: SwaggerEnumType = [
  'id',
  '-id',
  'name',
  '-name',
  'totalClearCount',
  '-totalClearCount',
  'averageFinalMark',
  '-averageFinalMark',
  'averageRetryCount',
  '-averageRetryCount',
  'averageClearTime',
  '-averageClearTime',
];

@Controller('subjects')
@ApiTags('subjects')
export class SubjectsController {
  constructor(private subjectService: SubjectsService) {}
  @Get()
  @ApiOkResponse({ type: [GetSubjectDto] })
  @ApiQuery({ name: 'scope', required: false, enum: ['inner', 'outer'] })
  @ApiQuery({ name: 'sort', required: false, enum: subjectsSortOptions })
  @ApiQuery({ name: 'page', required: false })
  getSubjects(
    @Query('scope') scope: string, // 'inner' | 'outer'
    @Query('sort') sort: string,
    @Query('page') page: string
  ): Promise<GetSubjectDto[]> {
    const userId = 1;
    return this.subjectService.getSubjects(
      userId,
      scope && scope !== 'inner' ? false : undefined,
      sort,
      page ? Number(page) : undefined
    );
  }
}

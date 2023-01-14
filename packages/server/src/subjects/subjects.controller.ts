import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetSubjectDto } from './dto/getSubject.dto';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
@ApiTags('subjects')
export class SubjectsController {
  constructor(private subjectService: SubjectsService) {}
  @Get()
  @ApiOkResponse({ type: [GetSubjectDto] })
  @ApiQuery({ name: 'scope', required: false, enum: ['inner', 'outer'] })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'page', required: false })
  getSubjects(
    @Query('scope') scope: string, // 'inner' | 'outer'
    @Query('sort') sort: string,
    @Query('page') page: number
  ): Promise<GetSubjectDto[]> {
    const userId = 1;
    return this.subjectService.getSubjects(userId, scope, sort, page);
  }
}

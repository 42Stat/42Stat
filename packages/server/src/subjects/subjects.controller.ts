import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetSubjectDto } from './dto/getSubject.dto';

@Controller('subjects')
@ApiTags('subjects')
export class SubjectsController {
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
    return;
  }
}

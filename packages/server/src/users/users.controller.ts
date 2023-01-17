import { Controller, Get, Param, Query } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { GetSubjectDto } from '../subjects/dto/getSubject.dto';
import { GetUserFeedbackDto } from './dto/getUserFeedbacks.dto';
import { GetUserProfileDto } from './dto/getUserProfile.dto';
import { GetUserSummaryDto } from './dto/getUserSummary.dto';
import { UsersService } from './users.service';

const userSubjectsSortOptions = [
  'markedAt',
  '-markedAt',
  'finalMark',
  '-finalMark',
  'occurrence',
  '-occurrence',
  'clearTime',
  '-clearTime',
];
@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/profile')
  @ApiBearerAuth()
  @ApiOkResponse({ type: GetUserProfileDto })
  async getUserProfile(@Param('id') id: number): Promise<GetUserProfileDto> {
    return await this.usersService.getUserProfile(id);
  }

  @Get(':id/summary')
  @ApiOkResponse({ type: GetUserSummaryDto })
  async getUserSummary(@Param('id') id: number): Promise<GetUserSummaryDto> {
    return await this.usersService.getUserSummary(id);
  }

  @Get(':id/subjects')
  @ApiOkResponse({ type: [GetSubjectDto] })
  @ApiQuery({
    name: 'sort',
    required: false,
    description: '정렬 가능 요소 미정(현재 컬럼명으로 소팅 가능)',
    enum: userSubjectsSortOptions,
  })
  @ApiQuery({ name: 'page', required: false })
  async getUserSubjects(
    @Param('id') id: number,
    @Query('sort') sort: string,
    @Query('page') page: string
  ): Promise<GetSubjectDto[]> {
    return await this.usersService.getUserSubjects(
      id,
      sort,
      page ? parseInt(page) : 1
    );
  }

  @Get(':id/feedbacks')
  @ApiOkResponse({ type: [GetUserFeedbackDto] })
  @ApiQuery({ name: 'type', enum: ['as-corrector', 'as-corrected'] })
  @ApiQuery({ name: 'outstanding', required: false, enum: ['true', 'false'] })
  @ApiQuery({ name: 'subject', required: false })
  @ApiQuery({ name: 'page', required: false })
  async getUserFeedbacks(
    @Param('id') id: number,
    @Query('type') type: string,
    @Query('outstanding') outstanding: string,
    @Query('subject') subject: string,
    @Query('page') page: string
  ): Promise<GetUserFeedbackDto[]> {
    return await this.usersService.getUserFeedbacks(
      id,
      type,
      outstanding === 'true' ? true : false,
      subject,
      page ? parseInt(page) : 1
    );
  }
}

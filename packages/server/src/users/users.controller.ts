import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetSubjectDto } from '../subjects/dto/getSubject.dto';
import { GetUserFeedbackDto } from './dto/getUserFeedbacks.dto';
import { GetUserProfileDto } from './dto/getUserProfile.dto';
import { GetUserSummaryDto } from './dto/getUserSummary.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id/profile')
  @ApiOkResponse({ type: GetUserProfileDto })
  async getUserProfile(@Param('id') id: number): Promise<GetUserProfileDto> {
    return;
    // return await this.usersService.getUserProfile(id);
  }

  @Get(':id/summary')
  @ApiOkResponse({ type: GetUserSummaryDto })
  async getUserSummary(@Param('id') id: number): Promise<GetUserSummaryDto> {
    return;
    // return await this.usersService.getUserSummary(id);
  }

  @Get(':id/subjects')
  @ApiOkResponse({ type: [GetSubjectDto] })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'page', required: false })
  async getUserSubjects(
    @Param('id') id: number,
    @Query('sort') sort: string,
    @Query('page') page: number
  ): Promise<GetSubjectDto[]> {
    return;
    // return await this.usersService.getUserSubjects(id);
  }

  @Get(':id/feedbacks/corrector')
  @ApiOkResponse({ type: [GetUserFeedbackDto] })
  @ApiQuery({ name: 'outstanding', required: false })
  @ApiQuery({ name: 'subject', required: false })
  @ApiQuery({ name: 'page', required: false })
  async getUserFeedbacksAsCorrector(
    @Param('id') id: number,
    @Query('outstanding') outstanding: boolean,
    @Query('subject') subject: string,
    @Query('page') page: number
  ): Promise<GetUserFeedbackDto[]> {
    return;
    // return await this.usersService.getUserFeedbacksAsCorrector(id, filter, page);
  }

  @Get(':id/feedbacks/corrected')
  @ApiOkResponse({ type: [GetUserFeedbackDto] })
  @ApiQuery({ name: 'outstanding', required: false })
  @ApiQuery({ name: 'subject', required: false })
  @ApiQuery({ name: 'page', required: false })
  async getUserFeedbacksAsCorrected(
    @Param('id') id: number,
    @Query('outstanding') outstanding: boolean,
    @Query('subject') subject: string,
    @Query('page') page: number
  ): Promise<GetUserFeedbackDto[]> {
    return;
    // return await this.usersService.getUserFeedbacksAsCorrected(id, filter, page);
  }
}

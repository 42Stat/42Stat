import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { GetUserProfileDto } from './dto/getUserProfile.dto';
import { GetUserSummaryDto } from './dto/getUserSummary.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id/profile')
  @ApiOkResponse({ type: GetUserProfileDto })
  async getUserProfile(@Param('id') id: number): Promise<GetUserProfileDto> {
    // return await this.usersService.getUserProfile(id);
    return;
  }

  @Get(':id/summary')
  @ApiOkResponse({ type: GetUserSummaryDto })
  async getUserSummary(@Param('id') id: number) {
    return await this.usersService.getUserSummary(id);
  }

  @Get(':id/subjects')
  async getUserSubjects(@Param('id') id: number) {
    return await this.usersService.getUserSubjects(id);
  }

  @Get(':id/feedbacks/corrector')
  async getUserFeedbacksAsCorrector(
    @Param('id') id: number,
    @Query('filter') filter: string,
    @Query('page') page: number
  ) {}

  @Get(':id/feedbacks/corrected')
  async getUserFeedbacksAsCorrected(
    @Param('id') id: number,
    @Query('filter') filter: string,
    @Query('page') page: number
  ) {}
}

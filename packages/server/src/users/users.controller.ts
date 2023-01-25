import { Controller, Get, Param, Query } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Payload } from '../auth/payload.decorator';
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

type AccessTokenPayload = {
  googleId: string;
  intraId: number;
};

@Controller('users')
@ApiTags('users')
// @ApiBearerAuth()
export class UsersController {
  constructor(private usersService: UsersService) {}

  // ANCHOR: me
  @UseGuards(AuthGuard('jwt'))
  @Get('me/profile')
  @ApiOkResponse({ type: GetUserProfileDto })
  async getMyProfile(
    @Payload() payload: AccessTokenPayload
  ): Promise<GetUserProfileDto> {
    return await this.usersService.getUserProfile(payload?.intraId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me/summary')
  @ApiOkResponse({ type: GetUserSummaryDto })
  async getMySummary(
    @Payload() payload: AccessTokenPayload
  ): Promise<GetUserSummaryDto> {
    return await this.usersService.getUserSummary(payload?.intraId);
  }

  @Get('me/subjects')
  @ApiOkResponse({ type: [GetSubjectDto] })
  @ApiQuery({
    name: 'sort',
    required: false,
    description: '정렬 가능 요소 미정(현재 컬럼명으로 소팅 가능)',
    enum: userSubjectsSortOptions,
  })
  @ApiQuery({ name: 'page', required: false })
  async getMySubjects(
    @Payload() payload: AccessTokenPayload,
    @Query('sort') sort: string,
    @Query('page') page: string
  ): Promise<GetSubjectDto[]> {
    return await this.usersService.getUserSubjects(
      payload?.intraId,
      sort,
      page ? Number(page) : 1
    );
  }

  @Get('me/feedbacks')
  @ApiOkResponse({ type: [GetUserFeedbackDto] })
  @ApiQuery({ name: 'type', enum: ['as-corrector', 'as-corrected'] })
  @ApiQuery({ name: 'outstanding', required: false, enum: ['true', 'false'] })
  @ApiQuery({ name: 'subject', required: false })
  @ApiQuery({ name: 'page', required: false })
  async getMyFeedbacks(
    @Payload() payload: AccessTokenPayload,
    @Query('type') type: string,
    @Query('outstanding') outstanding: string,
    @Query('subject') subject: string,
    @Query('page') page: string
  ): Promise<GetUserFeedbackDto[]> {
    return await this.usersService.getUserFeedbacks(
      payload?.intraId,
      type,
      outstanding,
      subject,
      page ? Number(page) : 1
    );
  }

  // ANCHOR: id
  // @UseGuards(AuthGuard('jwt'))
  @Get(':id/profile')
  @ApiOkResponse({ type: GetUserProfileDto })
  async getUserProfile(@Param('id') id: number): Promise<GetUserProfileDto> {
    return await this.usersService.getUserProfile(id);
  }

  // @UseGuards(AuthGuard('jwt'))
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
      page ? Number(page) : 1
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
      outstanding,
      subject,
      page ? Number(page) : 1
    );
  }
}

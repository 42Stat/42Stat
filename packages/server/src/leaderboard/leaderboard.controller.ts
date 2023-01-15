import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SwaggerEnumType } from '@nestjs/swagger/dist/types/swagger-enum.type';
import { GetLeaderboardDto } from './dto/getLeaderboard.dto';
import { LeaderboardService } from './leaderboard.service';

const leaderboardSortOptions: SwaggerEnumType = [
  'level',
  '-level',
  'totalCoalitionScore',
  '-totalCoalitionScore',
  'passedSubjectCount',
  '-passedSubjectCount',
  'totalEvaluationCount',
  '-totalEvaluationCount',
];

@Controller('leaderboard')
@ApiTags('leaderboard')
export class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) {}

  @Get()
  @ApiOkResponse({ type: [GetLeaderboardDto] })
  @ApiQuery({ name: 'sort', required: false, enum: leaderboardSortOptions })
  @ApiQuery({ name: 'generation', required: false })
  @ApiQuery({
    name: 'coalition',
    required: false,
    enum: ['gun', 'gon', 'gam', 'lee'],
  })
  async getLeaderboard(
    @Query('sort') sort: string,
    @Query('generation') generation: number,
    @Query('coalition') coalition: string,
    @Query('page') page: string
  ): Promise<GetLeaderboardDto[]> {
    return this.leaderboardService.getLeaderboard(
      sort,
      generation,
      coalition,
      page ? parseInt(page) : undefined
    );
  }
}

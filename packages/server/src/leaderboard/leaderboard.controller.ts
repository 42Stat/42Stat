import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetLeaderboardDto } from './dto/getLeaderboard.dto';
import { LeaderboardService } from './leaderboard.service';

@Controller('leaderboard')
@ApiTags('leaderboard')
export class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) {}
  @Get()
  @ApiOkResponse({ type: [GetLeaderboardDto] })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'generation', required: false })
  @ApiQuery({
    name: 'coalition',
    required: false,
    enum: ['gun', 'gon', 'gam', 'lee'],
  })
  async getLeaderboard(
    @Query('sort') sort: string,
    @Query('generation') generation: number,
    @Query('coalition') coalition: string
  ): Promise<GetLeaderboardDto[]> {
    return this.leaderboardService.getLeaderboard(sort, generation, coalition);
  }
}

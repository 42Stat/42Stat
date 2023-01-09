import {
  Controller,
  Get,
  Injectable,
  PipeTransform,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetLeaderboardDto } from './dto/getLeaderboard.dto';

@Controller('leaderboard')
@ApiTags('leaderboard')
export class LeaderboardController {
  @Get()
  @ApiOkResponse({ type: [GetLeaderboardDto] })
  @ApiQuery({
    name: 'coalition',
    required: false,
    enum: ['gun', 'gon', 'gam', 'lee'],
  })
  @ApiQuery({ name: 'generation', required: false })
  @ApiQuery({ name: 'sort', required: false })
  async getLeaderboard(
    @Query('coalition') coalition: string,
    @Query('generation') generation: number,
    @Query('sort') sort: string
  ): Promise<GetLeaderboardDto[]> {
    console.log(coalition);
    console.log(generation);
    console.log(sort);
    return;
  }
}

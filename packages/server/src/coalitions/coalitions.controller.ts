import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetCoalitionStatDto } from './dto/getCoalitionStat.dto';

@Controller('coalitions')
@ApiTags('coalitions')
export class CoalitionsController {
  @Get()
  @ApiResponse({ type: [GetCoalitionStatDto] })
  getCoalitionStats(): Promise<GetCoalitionStatDto[]> {
    return;
  }
}

import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoalitionsService } from './coalitions.service';
import { GetCoalitionsDto } from './dto/getCoalition.dto';

@Controller('coalitions')
@ApiTags('coalitions')
export class CoalitionsController {
  constructor(private coalitionsService: CoalitionsService) {}
  @Get()
  @ApiResponse({ type: GetCoalitionsDto })
  getCoalitions(): Promise<GetCoalitionsDto> {
    return this.coalitionsService.getCoalitions();
  }
}

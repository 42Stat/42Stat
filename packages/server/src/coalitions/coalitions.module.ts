import { Module } from '@nestjs/common';
import { CoalitionsController } from './coalitions.controller';
import { CoalitionsService } from './coalitions.service';

@Module({
  controllers: [CoalitionsController],
  providers: [CoalitionsService]
})
export class CoalitionsModule {}

import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CoalitionsController } from './coalitions.controller';
import { coalitionsProviders } from './coalitions.providers';
import { CoalitionsService } from './coalitions.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CoalitionsController],
  providers: [CoalitionsService, ...coalitionsProviders],
})
export class CoalitionsModule {}

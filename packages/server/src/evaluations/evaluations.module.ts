import { Module } from '@nestjs/common';
import { EvaluationsController } from './evaluations.controller';
import { EvaluationsService } from './evaluations.service';

@Module({
  controllers: [EvaluationsController],
  providers: [EvaluationsService]
})
export class EvaluationsModule {}

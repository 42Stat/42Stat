import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { EvaluationsController } from './evaluations/evaluations.controller';
import { CoalitionsController } from './coalitions/coalitions.controller';
import { SubjectsController } from './subjects/subjects.controller';
import { UsersModule } from './users/users.module';
import { CoalitionsModule } from './coalitions/coalitions.module';
import { EvaluationsModule } from './evaluations/evaluations.module';
import { SubjectsModule } from './subjects/subjects.module';

@Module({
  imports: [UsersModule, CoalitionsModule, EvaluationsModule, SubjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

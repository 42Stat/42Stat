import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SubjectsController } from './subjects.controller';
import { subjectsProviders } from './subjects.providers';
import { SubjectsService } from './subjects.service';

@Module({
  imports: [DatabaseModule],
  controllers: [SubjectsController],
  providers: [SubjectsService, ...subjectsProviders],
  exports: [...subjectsProviders],
})
export class SubjectsModule {}

import { Module } from '@nestjs/common';
import { subjectsProviders } from '../subjects/subjects.providers';
import { DatabaseModule } from '../database/database.module';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders, ...subjectsProviders],
})
export class UsersModule {}

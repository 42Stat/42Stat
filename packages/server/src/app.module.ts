import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CoalitionsModule } from './coalitions/coalitions.module';
import { SubjectsModule } from './subjects/subjects.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';

@Module({
  imports: [UsersModule, CoalitionsModule, SubjectsModule, LeaderboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { usersProviders } from '../users/users.providers';
import { DatabaseModule } from '../database/database.module';
import { LeaderboardController } from './leaderboard.controller';
import { LeaderboardService } from './leaderboard.service';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [LeaderboardController],
  providers: [LeaderboardService, ...usersProviders],
})
export class LeaderboardModule {}

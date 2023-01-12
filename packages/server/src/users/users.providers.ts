import { DataSource } from 'typeorm';
import { Achievement, AchievementUser } from './entity/achievement.entity';
import { CorrectedStat } from './entity/correctedStat.entity';
import { CorrectorStat } from './entity/correctorStat.entity';
import { MonthlyEvaluationCount } from './entity/monthlyEvaluationCount.entity';
import { IntraUser } from './entity/intraUser.entity';
import { SubjectStat } from './entity/subjectStat.entity';
import { Title, TitleUser } from './entity/title.entity';
import { User } from './entity/user.entity';
import { MonthlyCoalitionScore } from './entity/monthlyCoalitionScore.entity';

export const usersProviders = [
  {
    provide: 'INTRA_USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(IntraUser),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ACHIEVEMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Achievement),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ACHIVEMENT_USER_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(AchievementUser),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'TITLE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Title),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'TITLE_USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TitleUser),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'CORRECTED_STAT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CorrectedStat),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'CORRECTOR_STAT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CorrectorStat),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'SUBJECT_STAT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SubjectStat),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'MONTHLY_COALITION_POINT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MonthlyCoalitionScore),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'MONTHLY_EVALUATION_COUNT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MonthlyEvaluationCount),
    inject: ['DATA_SOURCE'],
  },
];

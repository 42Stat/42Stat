import { DataSource } from 'typeorm';
import { Coalition } from './entity/coalition.entity';
import { CoalitionScore } from './entity/coalitionScore.entity';

export const coalitionsProviders = [
  {
    provide: 'COALITION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Coalition),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'COALITION_SCORE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CoalitionScore),
    inject: ['DATA_SOURCE'],
  },
];

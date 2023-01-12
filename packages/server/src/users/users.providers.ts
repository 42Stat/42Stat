import { DataSource } from 'typeorm';
import { IntraUser } from './entity/intraUser.entity';

export const usersProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useFactory: (DataSource: DataSource) => DataSource.getRepository(IntraUser),
    inject: ['DATA_SOURCE'],
  },
];

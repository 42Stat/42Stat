import { Subject } from './entity/subject.entity';
import { Team } from './entity/team.entity';
import { Evaluation } from './entity/evaluation.entity';
import { Project } from './entity/project.entity';
import { DataSource } from 'typeorm';
import { TeamUser } from './entity/teamUser.entity';

export const subjectsProviders = [
  {
    provide: 'SUBJECT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Subject),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'TEAM_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Team),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'EVALUATION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Evaluation),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PROJECT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Project),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'TEAM_USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TeamUser),
    inject: ['DATA_SOURCE'],
  },
];

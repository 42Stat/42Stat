import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../database/database.module';
import { GetUserProfileDto } from './dto/getUserProfile.dto';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';
import { SubjectsModule } from '../subjects/subjects.module';
import { ConfigModule } from '@nestjs/config';
import { DataSource, FindOneOptions, Repository } from 'typeorm';
import { IntraUser } from './entity/intraUser.entity';
import { Coalition } from '../coalitions/entity/coalition.entity';
import { Team } from '../subjects/entity/team.entity';
import { Project } from '../subjects/entity/project.entity';
import { TeamUser } from '../subjects/entity/teamUser.entity';
import { Evaluation } from '../subjects/entity/evaluation.entity';
import { SubjectStat } from './entity/subjectStat.entity';
import { CorrectorStat } from './entity/correctorStat.entity';
import { TitleUser } from './entity/title.entity';
import { CorrectedStat } from './entity/correctedStat.entity';
import { User } from './entity/user.entity';
import { NotFoundException } from '@nestjs/common';
import { Subject } from '../subjects/entity/subject.entity';
import { GetUserSummaryDto } from './dto/getUserSummary.dto';

const coalition1: Coalition = {
  id: 85,
  name: 'Gun',
  imageUrl: 'https://cdn.intra.42.fr/coalition/image/85/gun-svg-svg.svg',
  color: '#FFC221',
  activeUserCount: 2,
  subjectPassedCount: 2,
  evaluationCount: 2,
  blackholedUserCount: 2,
};

const intraUser1: IntraUser = {
  id: 99947,
  email: 'jaham@student.42seoul.kr',
  login: 'jaham',
  displayName: 'Jaewon Ham',
  imageUrl: 'https://cdn.intra.42.fr/users/jaham.jpg',
  correctionPoint: 30,
  wallet: 2000,
  active: true,
  grade: 'member',
  level: 11.38,
  generation: 5,
  beginAt: new Date('2021-11-08T01:00:00.000Z'),
  updatedAt: new Date('2023-01-11T08:41:50.165Z'),
  blackholedAt: null,
  coalition: coalition1,
  coalitionUserId: 69674,
  totalCoalitionScore: 100000,
  passedSubjectCount: 29,
  totalEvaluationCount: 100,
  titleUsers: [],
  achievementUsers: [],
  monthlyEvaluationCounts: [],
  monthlyCoalitionScores: [],
  teamUsers: [],
  projects: [],
};

const getUserProfileDto: GetUserProfileDto = {
  id: intraUser1.id,
  imageUrl: intraUser1.imageUrl,
  name: intraUser1.displayName,
  login: intraUser1.login,
  rank: 1,
  level: intraUser1.level,
  grade: intraUser1.grade,
  coalition: {
    id: intraUser1.coalition.id,
    name: intraUser1.coalition.name,
    imageUrl: intraUser1.coalition.imageUrl,
    color: intraUser1.coalition.color,
  },
  startedAt: new Date(),
  daysSinceStarted: 1,
  blackholedAt: null,
  daysUntilBlackholed: null,
};

const correctorStat1: CorrectorStat = {
  id: 1,
  intra: intraUser1,
  averageMark: 80.51,
  evaluationCount: 100,
  averageEvaluationCount: 8.31,
  outstandingCount: 10,
  averageBeginTime: 100000000,
  averageDuration: 30000000,
  averageCommentLength: 143.5,
};

const correctedStat1: CorrectedStat = {
  id: 1,
  intra: intraUser1,
  averageMark: 80.51,
  evaluationCount: 100,
  averageEvaluationCount: 8.31,
  outstandingCount: 10,
  averageBeginTime: 50000000,
  averageDuration: 30000000,
  averageFeedbackLength: 143.5,
};

const subject1: Subject = {
  id: 1,
  name: '과제',
  slug: '42cursus-ft_printf',
  averageFinalMark: 80.51,
  averageRetryCount: 2.3,
  averageClearTime: 24.5 * 24 * 60 * 60 * 1000,
  isExam: false,
  totalClearCount: 100,
  isCommonCourse: true,
  projects: [],
};

const project1: Project = {
  id: 1,
  subject: subject1,
  intra: intraUser1,
  occurrence: 1,
  finalMark: 100,
  status: 2,
  validated: true,
  marked: true,
  createdAt: new Date(),
  markedAt: new Date(),
  clearTime: 24.5 * 24 * 60 * 60 * 1000,
  teams: [],
};

const subjectStat1: SubjectStat = {
  id: 15,
  intra: intraUser1,
  averageFinalMark: 80.51,
  averageClearTime: 24.5 * 24 * 60 * 60 * 1000,
  passedCount: 10,
  totalRetryCount: 100,
  lastProject: project1,
};

const overall1 = {
  rank: 1,
  level: intraUser1.level,
  wallet: intraUser1.wallet,
  correctionPoint: intraUser1.correctionPoint,
  totalEvaluationCount: intraUser1.totalEvaluationCount,
  coalitionPointRank: 1,
  totalCoalitionPoint: 100000,
};

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let intraUserRepository: Repository<IntraUser>;
  let userRepository: Repository<User>;
  let correctedStatRepository: Repository<CorrectedStat>;
  let titleUserRepository: Repository<TitleUser>;
  let correctorStatRepository: Repository<CorrectorStat>;
  let subjectStatRepository: Repository<SubjectStat>;
  let evaluationRepository: Repository<Evaluation>;
  let teamUserRepository: Repository<TeamUser>;
  let projectRepository: Repository<Project>;
  let teamRepository: Repository<Team>;
  let dataSource: DataSource;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ envFilePath: '../../../../env/server/.env' }),
        DatabaseModule,
        SubjectsModule,
      ],
      controllers: [UsersController],
      providers: [UsersService, ...usersProviders],
    }).compile();

    intraUserRepository = moduleRef.get('INTRA_USER_REPOSITORY');
    userRepository = moduleRef.get('USER_REPOSITORY');
    correctedStatRepository = moduleRef.get('CORRECTED_STAT_REPOSITORY');
    titleUserRepository = moduleRef.get('TITLE_USER_REPOSITORY');
    correctorStatRepository = moduleRef.get('CORRECTOR_STAT_REPOSITORY');
    subjectStatRepository = moduleRef.get('SUBJECT_STAT_REPOSITORY');
    evaluationRepository = moduleRef.get('EVALUATION_REPOSITORY');
    teamUserRepository = moduleRef.get('TEAM_USER_REPOSITORY');
    projectRepository = moduleRef.get('PROJECT_REPOSITORY');
    teamRepository = moduleRef.get('TEAM_REPOSITORY');

    dataSource = moduleRef.get('DATA_SOURCE');
    usersService = moduleRef.get<UsersService>(UsersService);
    usersController = moduleRef.get<UsersController>(UsersController);
  });

  // ANCHOR: getUserProfile
  describe('getUserProfile', () => {
    it('정상 동작', async () => {
      jest
        .spyOn(intraUserRepository, 'findOne')
        .mockResolvedValueOnce(intraUser1);

      expect(await usersController.getUserProfile(1)).toBeInstanceOf(
        GetUserProfileDto
      );
    });
    it('존재하지 않는 유저', async () => {
      jest.spyOn(intraUserRepository, 'findOne');
      jest.spyOn(intraUserRepository, 'findOne').mockResolvedValueOnce(null);

      try {
        await usersController.getUserProfile(2);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
    it('존재하지 않는 유저(undefined)', async () => {
      jest.spyOn(intraUserRepository, 'findOne').mockResolvedValueOnce(null);

      try {
        await usersController.getUserProfile(undefined);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  // ANCHOR: getUserSummary
  describe('getUserSummary', () => {
    it('정상 동작', async () => {
      jest
        .spyOn(intraUserRepository, 'findOne')
        .mockResolvedValueOnce(intraUser1);
      jest
        .spyOn(correctorStatRepository, 'findOne')
        .mockResolvedValueOnce(correctorStat1);
      jest
        .spyOn(correctedStatRepository, 'findOne')
        .mockResolvedValueOnce(correctedStat1);
      jest
        .spyOn(subjectStatRepository, 'findOne')
        .mockResolvedValueOnce(subjectStat1);
      jest.spyOn(usersService, 'getOverall').mockResolvedValueOnce(overall1);

      expect(await usersController.getUserSummary(1)).toBeInstanceOf(
        GetUserSummaryDto
      );
    });
    it('존재하지 않는 유저', async () => {
      jest.spyOn(intraUserRepository, 'findOne').mockResolvedValueOnce(null);
      jest
        .spyOn(correctorStatRepository, 'findOne')
        .mockResolvedValueOnce(correctorStat1);
      jest
        .spyOn(correctedStatRepository, 'findOne')
        .mockResolvedValueOnce(correctedStat1);
      jest
        .spyOn(subjectStatRepository, 'findOne')
        .mockResolvedValueOnce(subjectStat1);
      jest.spyOn(usersService, 'getOverall').mockResolvedValueOnce(overall1);

      try {
        await usersController.getUserSummary(2);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
    it('존재하지 않는 유저(undefined)', async () => {
      // jest.spyOn(intraUserRepository, 'findOne').mockResolvedValueOnce(null);
      jest
        .spyOn(correctorStatRepository, 'findOne')
        .mockResolvedValueOnce(correctorStat1);
      jest
        .spyOn(correctedStatRepository, 'findOne')
        .mockResolvedValueOnce(correctedStat1);
      jest
        .spyOn(subjectStatRepository, 'findOne')
        .mockResolvedValueOnce(subjectStat1);
      jest.spyOn(usersService, 'getOverall').mockResolvedValueOnce(overall1);

      try {
        await usersController.getUserSummary(undefined);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  // ANCHOR: getUserSubjects
  describe('getUserSubjects', () => {
    // 정상 동작(only id)
    it('정상 동작', async () => {});
    // 정상 동작(id, page)
    // 정상 동작(id, page, sort)
    // 존재하지 않는 유저
    // 존재하지 않는 유저(undefined)
    // 페이지 에러(0)
    // 페이지 에러(-1)
    // 페이지 에러(1.5)
    // 페이지 에러(undefined)
    // 정렬 에러(undefined)
  });

  // ANCHOR: getUserFeedbacks
  describe('getFeedbacks', () => {
    // 정상 동작(id, type)
    // 정상 동작(id, type, outstanding)
    // 정상 동작(id, type, outstanding, page)
    // 정상 동작(id, type, outstanding, page, subject)
    // 존재하지 않는 유저
    // 존재하지 않는 유저(undefined)
    // 페이지 에러(0)
    // 페이지 에러(-1)
    // 페이지 에러(1.5)
    // 페이지 에러(undefined)
    // 옵션 에러(outstanding: undefined)
    // 옵션 에러(subject: '')
  });
});

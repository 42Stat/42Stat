import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../database/database.module';
import { GetUserProfileDto } from './dto/getUserProfile.dto';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';
import { SubjectsModule } from '../subjects/subjects.module';
import { ConfigModule } from '@nestjs/config';
import { DataSource, Repository } from 'typeorm';
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
import {
  BadRequestException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Subject } from '../subjects/entity/subject.entity';
import { GetUserSummaryDto } from './dto/getUserSummary.dto';
import { GetUserSubjectDto } from '../subjects/dto/getSubject.dto';

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

const user1: User = {
  id: '1',
  intra: null,
  refreshToken: null,
};
const user2: User = {
  id: '123',
  intra: null,
  refreshToken: null,
};

type AccessTokenPayload = {
  intraId: number;
  googleId: string;
};

const accessTokenPayload1: AccessTokenPayload = {
  intraId: 99947,
  googleId: '123',
};

const accessTokenPayload2: AccessTokenPayload = {
  intraId: null,
  googleId: '123',
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
  averageFeedbackLength: 100.5,
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

const project2: Project = {
  id: 2,
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

const team1: Team = {
  id: 1,
  project: project1,
  name: "jaham's group-1",
  status: 1,
  createdAt: new Date(),
  finalMark: 100,
  locked: true,
  closed: true,
  lockedAt: new Date(),
  closedAt: new Date(),
  users: [],
  evaluations: [],
};

const evaluation1: Evaluation = {
  id: 1,
  corrector: intraUser1,
  comment: 'good',
  feedback: 'good',
  finalMark: 100,
  positive: true,
  flag: 1,
  beginAt: new Date(),
  endAt: new Date(),
  rating: 5,
  team: team1,
};

const evaluation2: Evaluation = {
  id: 2,
  corrector: intraUser1,
  comment: 'good',
  feedback: 'good',
  finalMark: 100,
  positive: true,
  flag: 1,
  beginAt: new Date(),
  endAt: new Date(),
  rating: 5,
  team: team1,
};

const evaluation3: Evaluation = {
  id: 3,
  corrector: intraUser1,
  comment: 'good',
  feedback: 'good',
  finalMark: 100,
  positive: true,
  flag: 1,
  beginAt: new Date(),
  endAt: new Date(),
  rating: 5,
  team: team1,
};

const evaluation4: Evaluation = {
  id: 4,
  corrector: intraUser1,
  comment: 'good',
  feedback: 'good',
  finalMark: 100,
  positive: true,
  flag: 1,
  beginAt: new Date(),
  endAt: new Date(),
  rating: 5,
  team: team1,
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
        // ConfigModule.forRoot({ envFilePath: '../../../../env/server/.env' }),
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

  it('saveIntraUser Test', async () => {
    const result = await usersService.saveIntraUser(user1, intraUser1);
    console.log(result);
    expect(result).toBeInstanceOf(Object);
  });
  it('saveIntraUser Test', async () => {
    try {
      const result = await usersService.saveIntraUser(user2, intraUser1);
      console.log(result);
    } catch (error) {
      expect(error).toBeInstanceOf(ServiceUnavailableException);
    }
  });

  // ANCHOR: getMyProfile
  describe('getMyProfile', () => {
    // 정상 동작
    it('정상 동작', async () => {
      expect(
        await usersController.getMyProfile(accessTokenPayload1)
      ).toBeInstanceOf(GetUserProfileDto);
    });
    // intraId가 null인 경우
    it('intraId가 null인 경우', async () => {
      try {
        await usersController.getMyProfile(accessTokenPayload2);
      } catch (error) {
        console.log(error);
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  // ANCHOR: getMySummary
  describe('getMySummary', () => {
    // 정상 동작
    it('정상 동작', async () => {
      expect(
        await usersController.getMySummary(accessTokenPayload1)
      ).toBeInstanceOf(GetUserSummaryDto);
    });
    // intraId가 null인 경우
    it('intraId가 null인 경우', async () => {
      try {
        await usersController.getMySummary(accessTokenPayload2);
      } catch (error) {
        console.log(error);
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  // ANCHOR: getMySubjects
  describe('getMySubjects', () => {
    it('정상 동작', async () => {
      expect(
        await usersController.getMySubjects(
          accessTokenPayload1,
          undefined,
          undefined
        )
      ).toBeInstanceOf(Array);
    });
    it('정상 동작(page)', async () => {
      expect(
        await usersController.getMySubjects(accessTokenPayload1, undefined, '2')
      ).toBeInstanceOf(Array);
    });
    // intraId가 null인 경우
    it('intraId가 null인 경우', async () => {
      try {
        await usersController.getMySubjects(
          accessTokenPayload2,
          undefined,
          undefined
        );
      } catch (error) {
        console.log(error);
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  // ANCHOR: getMyFeedbacks
  describe('getMyFeedbacks', () => {
    it('정상 동작', async () => {
      expect(
        await usersController.getMyFeedbacks(
          accessTokenPayload1,
          'as-corrector',
          undefined,
          undefined,
          undefined
        )
      ).toBeInstanceOf(Array);
    });
    it('정상 동작(page)', async () => {
      expect(
        await usersController.getMyFeedbacks(
          accessTokenPayload1,
          'as-corrector',
          undefined,
          undefined,
          '2'
        )
      ).toBeInstanceOf(Array);
    });
    // intraId가 null인 경우
    it('intraId가 null인 경우', async () => {
      try {
        await usersController.getMyFeedbacks(
          accessTokenPayload2,
          'as-corrected',
          undefined,
          undefined,
          undefined
        );
      } catch (error) {
        console.log(error);
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
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

      const result = await usersController.getUserSummary(1);
      expect(result).toBeInstanceOf(GetUserSummaryDto);
      expect(result.correctedStat.averageFeedbackLength).toEqual(143.5);
      expect(result.correctorStat.averageFeedbackLength).toEqual(100.5);
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
    it('정상 동작(only id)', async () => {
      jest
        .spyOn(projectRepository, 'find')
        .mockResolvedValueOnce([project1, project2]);
      const result = await usersController.getUserSubjects(
        99947,
        undefined,
        undefined
      );
      expect(result[0]).toBeInstanceOf(GetUserSubjectDto);
      expect(result[1]).toBeInstanceOf(GetUserSubjectDto);
    });
    // 정상 동작(id, page)
    it('정상 동작(id, page)', async () => {
      jest.spyOn(projectRepository, 'find').mockResolvedValueOnce([]);
      const result = await usersController.getUserSubjects(
        99947,
        undefined,
        '2'
      );
      expect(result).toBeInstanceOf(Array);
    });
    // 정상 동작(id, page, sort)
    it('정상 동작(id, page)', async () => {
      jest.spyOn(projectRepository, 'find').mockResolvedValueOnce([]);
      const result = await usersController.getUserSubjects(99947, 'id', '2');
      expect(result).toBeInstanceOf(Array);
    });
    // 존재하지 않는 유저
    it('존재하지 않는 유저', async () => {
      jest.spyOn(projectRepository, 'find').mockResolvedValueOnce([]);

      expect(
        await usersController.getUserSubjects(99948, undefined, undefined)
      ).toBeInstanceOf(Array);
    });
    // 존재하지 않는 유저(undefined)
    it('존재하지 않는 유저(undefined)', async () => {
      jest.spyOn(projectRepository, 'find').mockResolvedValueOnce([]);

      expect(
        await usersController.getUserSubjects(undefined, undefined, undefined)
      ).toBeInstanceOf(Array);
    });
    // 페이지 에러(0)
    it('페이지 에러(0)', async () => {
      try {
        await usersController.getUserSubjects(99947, undefined, '0');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
    // 페이지 에러(-1)
    it('페이지 에러(-1)', async () => {
      try {
        await usersController.getUserSubjects(99947, undefined, '-1');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
    // 페이지 에러(1.5)
    it('페이지 에러(1.5)', async () => {
      try {
        await usersController.getUserSubjects(99947, undefined, '1.5');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  // ANCHOR: getUserFeedbacks
  describe('getFeedbacks', () => {
    // 정상 동작(id, type)
    it('정상 동작(id, type)', async () => {
      jest.spyOn(teamUserRepository, 'find').mockResolvedValueOnce([]);
      jest
        .spyOn(evaluationRepository, 'find')
        .mockResolvedValueOnce([
          evaluation1,
          evaluation2,
          evaluation3,
          evaluation4,
        ]);
      expect(
        await usersController.getUserFeedbacks(
          99947,
          'as-corrected',
          undefined,
          undefined,
          undefined
        )
      ).toBeInstanceOf(Array);
    });
    // 정상 동작(id, type, outstanding)
    it('정상 동작(id, type, oustranding)', async () => {
      jest.spyOn(teamUserRepository, 'find').mockResolvedValueOnce([]);
      jest.spyOn(evaluationRepository, 'find').mockResolvedValueOnce([]);
      expect(
        await usersController.getUserFeedbacks(
          99947,
          'as-corrected',
          'true',
          undefined,
          undefined
        )
      ).toBeInstanceOf(Array);
    });
    // 정상 동작(id, type, outstanding, subject)
    it('정상 동작(id, type, oustranding, subject)', async () => {
      jest.spyOn(teamUserRepository, 'find').mockResolvedValueOnce([]);
      jest.spyOn(evaluationRepository, 'find').mockResolvedValueOnce([]);
      expect(
        await usersController.getUserFeedbacks(
          99947,
          'as-corrected',
          'true',
          'libft',
          undefined
        )
      ).toBeInstanceOf(Array);
    });
    // 정상 동작(id, type, outstanding, subject, page)
    it('정상 동작(id, type, outstanding, subject, page)', async () => {
      jest.spyOn(teamUserRepository, 'find').mockResolvedValueOnce([]);
      jest.spyOn(evaluationRepository, 'find').mockResolvedValueOnce([]);
      expect(
        await usersController.getUserFeedbacks(
          99947,
          'as-corrected',
          'true',
          'libft',
          '2'
        )
      ).toBeInstanceOf(Array);
    });
    // 존재하지 않는 유저
    it('존재하지 않는 유저', async () => {
      jest.spyOn(teamUserRepository, 'find').mockResolvedValueOnce([]);
      jest.spyOn(evaluationRepository, 'find').mockResolvedValueOnce([]);

      expect(
        await usersController.getUserFeedbacks(
          99948,
          'as-corrector',
          undefined,
          undefined,
          undefined
        )
      ).toBeInstanceOf(Array);
    });
    // 옵션 에러(type: undefined)
    it('옵션 에러(type: undefined)', async () => {
      try {
        await usersController.getUserFeedbacks(
          99947,
          undefined,
          undefined,
          undefined,
          undefined
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
    // 페이지 에러(0)
    it('페이지 에러(0)', async () => {
      try {
        await usersController.getUserFeedbacks(
          99947,
          undefined,
          undefined,
          undefined,
          '0'
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
    // 페이지 에러(-1)
    it('페이지 에러(-1)', async () => {
      try {
        await usersController.getUserFeedbacks(
          99947,
          undefined,
          undefined,
          undefined,
          '-1'
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
    // 페이지 에러(1.5)
    it('페이지 에러(1.5)', async () => {
      try {
        await usersController.getUserFeedbacks(
          99947,
          undefined,
          undefined,
          undefined,
          '1.5'
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
    // 빈 서브젝트
    it('빈 서브젝트', async () => {
      expect(
        await usersController.getUserFeedbacks(
          99947,
          'as-corrected',
          undefined,
          '',
          undefined
        )
      ).toBeInstanceOf(Array);
    });
    // 유효하지 않은 Outstanding
    it('유효하지 않은 Outstanding', async () => {
      try {
        await usersController.getUserFeedbacks(
          99947,
          'as-corrected',
          'abc',
          undefined,
          undefined
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});

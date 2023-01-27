import { Test, TestingModule } from '@nestjs/testing';
import { IntraUser } from '../users/entity/intraUser.entity';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';
import { LeaderboardController } from './leaderboard.controller';
import { LeaderboardService } from './leaderboard.service';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { Coalition } from '../coalitions/entity/coalition.entity';

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

const coalition2: Coalition = {
  id: 86,
  name: 'Gon',
  imageUrl: 'https://cdn.intra.42.fr/coalition/image/86/gon-svg-svg.svg',
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
  imageUrl:
    'https://cdn.intra.42.fr/users/cfc5b84fa9130d86b32acec4aae7889f/jaham.jpg',
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

const intraUser2: IntraUser = {
  id: 110730,
  email: 'salee2@student.42seoul.kr',
  login: 'salee2',
  displayName: 'Sanghoon Lee',
  imageUrl:
    'https://cdn.intra.42.fr/users/064bbaeae582e63b1e78e45f9152e431/salee2.jpg',
  correctionPoint: 11,
  wallet: 100,
  active: true,
  grade: 'learner',
  level: 3.4,
  generation: 7,
  beginAt: new Date('2022-07-04T01:00:00.000Z'),
  updatedAt: new Date('2023-01-11T08:41:50.165Z'),
  blackholedAt: new Date('2023-04-23T01:00:00.000Z'),
  coalition: coalition1,
  coalitionUserId: 110730,
  totalCoalitionScore: 500000,
  totalEvaluationCount: 10,
  passedSubjectCount: 10,
  titleUsers: [],
  achievementUsers: [],
  monthlyEvaluationCounts: [],
  monthlyCoalitionScores: [],
  teamUsers: [],
  projects: [],
};

const intraUser3: IntraUser = {
  id: 99953,
  email: 'jisookim@student.42seoul.kr',
  login: 'jisookim',
  displayName: 'Jisoo Kim',
  imageUrl:
    'https://cdn.intra.42.fr/users/033dd0f728a397876e10c2b7264e20c6/jisookim.jpg',
  correctionPoint: 3,
  wallet: 1415,
  active: true,
  grade: 'learner',
  level: 5.432,
  generation: 5,
  beginAt: new Date('2021-11-08T01:00:00.000Z'),
  updatedAt: new Date('2023-01-13T05:53:57.021Z'),
  blackholedAt: new Date('2023-03-28T01:00:00.000Z'),
  coalition: coalition2,
  coalitionUserId: 69719,
  totalEvaluationCount: 10,
  totalCoalitionScore: 100000,
  passedSubjectCount: 29,
  titleUsers: [],
  achievementUsers: [],
  monthlyEvaluationCounts: [],
  monthlyCoalitionScores: [],
  teamUsers: [],
  projects: [],
};

const intraUser4: IntraUser = {
  id: 99733,
  login: 'dha',
  email: 'dha@student.42seoul.kr',
  displayName: 'Donghun Ha',
  imageUrl: null,
  correctionPoint: 0,
  wallet: 0,
  active: true,
  grade: 'member',
  level: 11.04,
  generation: 5,
  beginAt: new Date('2021-11-08T01:00:00.000Z'),
  updatedAt: new Date('2023-01-13T05:53:57.021Z'),
  blackholedAt: new Date('2023-03-28T01:00:00.000Z'),
  coalition: coalition2,
  coalitionUserId: 69515,
  totalEvaluationCount: 10,
  totalCoalitionScore: 100000,
  passedSubjectCount: 29,
  titleUsers: [],
  achievementUsers: [],
  monthlyEvaluationCounts: [],
  monthlyCoalitionScores: [],
  teamUsers: [],
  projects: [],
};

describe('LeaderboardController', () => {
  let controller: LeaderboardController;
  // let service: LeaderboardService;
  let intraUserRepository: Repository<IntraUser>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, UsersModule],
      controllers: [LeaderboardController],
      providers: [LeaderboardService],
    }).compile();

    controller = module.get<LeaderboardController>(LeaderboardController);
    // service = module.get<LeaderboardService>(LeaderboardService);
    intraUserRepository = module.get('INTRA_USER_REPOSITORY');
  });

  describe('getLeaderboard', () => {
    // 정상 작동(undefined, undefined, undefined, undefined)
    it('정상 작동(undefined, undefined, undefined, undefined)', async () => {
      jest
        .spyOn(intraUserRepository, 'find')
        .mockResolvedValueOnce([
          intraUser1,
          intraUser2,
          intraUser3,
          intraUser4,
        ]);
      const result = await controller.getLeaderboard(
        undefined,
        undefined,
        undefined,
        undefined
      );

      expect(result).toBeInstanceOf(Array);
    });

    // 정상 작동(undefined, '5', undefined, undefined)
    it('정상 작동(undefined, "5", undefined, undefined)', async () => {
      jest
        .spyOn(intraUserRepository, 'find')
        .mockResolvedValueOnce([
          intraUser1,
          intraUser2,
          intraUser3,
          intraUser4,
        ]);
      const result = await controller.getLeaderboard(
        undefined,
        '5',
        undefined,
        undefined
      );

      expect(result).toBeInstanceOf(Array);
    });
    // 정상 작동('level', undefined, undefined, undefined)
    it('정상 작동("level", undefined, undefined, undefined)', async () => {
      jest
        .spyOn(intraUserRepository, 'find')
        .mockResolvedValueOnce([
          intraUser1,
          intraUser2,
          intraUser3,
          intraUser4,
        ]);
      const result = await controller.getLeaderboard(
        'level',
        undefined,
        undefined,
        undefined
      );

      expect(result).toBeInstanceOf(Array);
    });
    // 정상 작동('-level', undefined, undefined, undefined)
    it('정상 작동("-level", undefined, undefined, undefined)', async () => {
      jest
        .spyOn(intraUserRepository, 'find')
        .mockResolvedValueOnce([
          intraUser1,
          intraUser2,
          intraUser3,
          intraUser4,
        ]);
      const result = await controller.getLeaderboard(
        '-level',
        undefined,
        undefined,
        undefined
      );

      expect(result).toBeInstanceOf(Array);
    });
    // 정상 작동(undefined, undefined, 'gun', undefined)
    it('정상 작동(undefined, undefined, "gun", undefined)', async () => {
      jest
        .spyOn(intraUserRepository, 'find')
        .mockResolvedValueOnce([
          intraUser1,
          intraUser2,
          intraUser3,
          intraUser4,
        ]);
      const result = await controller.getLeaderboard(
        undefined,
        undefined,
        'gun',
        undefined
      );

      expect(result).toBeInstanceOf(Array);
    });
    // 정상 작동(undefined, undefined, 'Gun', undefined)
    it('정상 작동(undefined, undefined, "Gun", undefined)', async () => {
      jest
        .spyOn(intraUserRepository, 'find')
        .mockResolvedValueOnce([
          intraUser1,
          intraUser2,
          intraUser3,
          intraUser4,
        ]);
      const result = await controller.getLeaderboard(
        undefined,
        undefined,
        'Gun',
        undefined
      );

      expect(result).toBeInstanceOf(Array);
    });
    // 정상 작동(undefined, undefined, undefined, '2')
    it('정상 작동(undefined, undefined, undefined, "2")', async () => {
      jest
        .spyOn(intraUserRepository, 'find')
        .mockResolvedValueOnce([
          intraUser1,
          intraUser2,
          intraUser3,
          intraUser4,
        ]);
      const result = await controller.getLeaderboard(
        undefined,
        undefined,
        undefined,
        '2'
      );

      expect(result).toBeInstanceOf(Array);
    });

    // 정상 작동('level', '5', 'gun', undefined)
    it(`정상 작동('level', '5', gun', undefined)`, async () => {
      jest
        .spyOn(intraUserRepository, 'find')
        .mockResolvedValueOnce([
          intraUser1,
          intraUser2,
          intraUser3,
          intraUser4,
        ]);
      const result = await controller.getLeaderboard(
        'level',
        '5',
        'gun',
        undefined
      );

      expect(result).toBeInstanceOf(Array);
    });
    // 정렬 에러('qwe')
    it(`정렬 에러('qwe')`, async () => {
      jest
        .spyOn(intraUserRepository, 'find')
        .mockResolvedValueOnce([
          intraUser1,
          intraUser2,
          intraUser3,
          intraUser4,
        ]);
      try {
        await controller.getLeaderboard('qwe', undefined, undefined, undefined);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
    // 코알리숑 에러('qwe')
    it(`코알리숑 에러('qwe')`, async () => {
      jest.spyOn(intraUserRepository, 'find').mockResolvedValueOnce([]);
      const result = await controller.getLeaderboard(
        undefined,
        undefined,
        'qwe',
        undefined
      );

      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(0);
    });
    // 기수 에러(0)
    it(`기수 에러(0)`, async () => {
      jest
        .spyOn(intraUserRepository, 'find')
        .mockResolvedValueOnce([
          intraUser1,
          intraUser2,
          intraUser3,
          intraUser4,
        ]);
      try {
        await controller.getLeaderboard(undefined, '0', undefined, undefined);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
    // 기수 에러(-1)
    it(`기수 에러(-1)`, async () => {
      jest
        .spyOn(intraUserRepository, 'find')
        .mockResolvedValueOnce([
          intraUser1,
          intraUser2,
          intraUser3,
          intraUser4,
        ]);
      try {
        await controller.getLeaderboard(undefined, '-1', undefined, undefined);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
    // 기수 에러(1.5)
    it(`기수 에러(1.5)`, async () => {
      jest
        .spyOn(intraUserRepository, 'find')
        .mockResolvedValueOnce([
          intraUser1,
          intraUser2,
          intraUser3,
          intraUser4,
        ]);
      try {
        await controller.getLeaderboard(undefined, '1.5', undefined, undefined);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
    // 페이지 에러('0')
    it(`페이지 에러('0')`, async () => {
      jest
        .spyOn(intraUserRepository, 'find')
        .mockResolvedValueOnce([
          intraUser1,
          intraUser2,
          intraUser3,
          intraUser4,
        ]);
      try {
        await controller.getLeaderboard(undefined, undefined, undefined, '0');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
    // 페이지 에러('-1')
    it(`페이지 에러('-1')`, async () => {
      jest
        .spyOn(intraUserRepository, 'find')
        .mockResolvedValueOnce([
          intraUser1,
          intraUser2,
          intraUser3,
          intraUser4,
        ]);
      try {
        await controller.getLeaderboard(undefined, undefined, undefined, '-1');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
    // 페이지 에러('1.5')
    it(`페이지 에러('1.5')`, async () => {
      jest
        .spyOn(intraUserRepository, 'find')
        .mockResolvedValueOnce([
          intraUser1,
          intraUser2,
          intraUser3,
          intraUser4,
        ]);
      try {
        await controller.getLeaderboard(undefined, undefined, undefined, '1.5');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});

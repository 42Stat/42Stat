// import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService, RefreshTokenPayload } from './auth.service';
import { FtOAuthStrategy } from './ftOAuth.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtRefreshStrategy } from './jwtRefresh.strategy';

import { UsersService } from '../users/users.service';
import { Coalition } from '../coalitions/entity/coalition.entity';
import { IntraUser } from '../users/entity/intraUser.entity';
import { Request, Response } from 'express';
import {
  LoginRequestDto,
  LoginResponseDto,
  TokenRefreshDto,
} from './dto/login.dto';
import {
  BadRequestException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../users/entity/user.entity';

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
  active: false,
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

const user1: User = {
  id: '1',
  intra: intraUser1,
  refreshToken: null,
};

const user2: User = {
  id: '1',
  intra: intraUser1,
  refreshToken: 'refreshToken',
};

const user3: User = {
  id: '1',
  intra: intraUser1,
  refreshToken: 'refreshToken',
};

const user4: User = {
  id: '1',
  intra: intraUser2,
  refreshToken: null,
};

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, JwtModule],
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtStrategy,
        JwtRefreshStrategy,
        FtOAuthStrategy,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('login', () => {
    // 정상 동작(유저가 없을 때)
    it('정상 동작(유저가 없을 때)', async () => {
      jest.spyOn(service, 'verifyGoogleCredential').mockResolvedValue('1');
      jest.spyOn(usersService, 'getUserByGoogleId').mockResolvedValue(null);
      jest.spyOn(usersService, 'saveUser').mockResolvedValue(null);
      jest
        .spyOn(controller, 'login')
        .mockImplementation(
          async (
            res: Response,
            loginDto: LoginRequestDto
          ): Promise<LoginResponseDto> => {
            const { body } = await service.login(loginDto);
            return body;
          }
        );
      expect(await controller.login(null, null)).toHaveProperty(
        'needFtOAuth',
        true
      );
    });

    // 정상 동작(유저가 있을 때, 리프레시 토큰 없음)
    it('정상 동작(유저가 있을 때, 리프레시 토큰 없음)', async () => {
      jest.spyOn(service, 'verifyGoogleCredential').mockResolvedValue('1');
      jest.spyOn(usersService, 'getUserByGoogleId').mockResolvedValue(user1);
      jest.spyOn(usersService, 'saveUser').mockResolvedValue(null);
      jest
        .spyOn(controller, 'login')
        .mockImplementation(
          async (
            res: Response,
            loginDto: LoginRequestDto
          ): Promise<LoginResponseDto> => {
            const { body } = await service.login(loginDto);
            return body;
          }
        );
      expect(await controller.login(null, null)).toHaveProperty(
        'needFtOAuth',
        false
      );
    });
    // 정상 동작(유저가 있을 때, 리프레시 토큰 만료)
    it('정상 동작(유저가 있을 때, 리프레시 토큰 만료)', async () => {
      const payload: RefreshTokenPayload = {
        googleId: '1',
        expirationTime: Date.now() - 1000,
      };
      jest.spyOn(service, 'verifyGoogleCredential').mockResolvedValue('1');
      jest.spyOn(usersService, 'getUserByGoogleId').mockResolvedValue(user2);
      jest.spyOn(usersService, 'saveUser').mockResolvedValue(null);
      jest.spyOn(jwtService, 'verify').mockReturnValueOnce(payload);
      jest
        .spyOn(controller, 'login')
        .mockImplementation(
          async (
            res: Response,
            loginDto: LoginRequestDto
          ): Promise<LoginResponseDto> => {
            const { body } = await service.login(loginDto);
            return body;
          }
        );
      expect((await controller.login(null, null)).refreshToken).not.toMatch(
        'refreshToken'
      );
    });
    // 정상 동작(유저가 있을 때, 리프레시 토큰 유효)
    it('정상 동작(유저가 있을 때, 리프레시 토큰 유효)', async () => {
      const payload: RefreshTokenPayload = {
        googleId: '1',
        expirationTime: Date.now() + 100000,
      };
      jest.spyOn(service, 'verifyGoogleCredential').mockResolvedValue('1');
      jest.spyOn(usersService, 'getUserByGoogleId').mockResolvedValue(user3);
      jest.spyOn(usersService, 'saveUser').mockResolvedValue(null);
      jest.spyOn(jwtService, 'verify').mockReturnValueOnce(payload);
      jest
        .spyOn(controller, 'login')
        .mockImplementation(
          async (
            res: Response,
            loginDto: LoginRequestDto
          ): Promise<LoginResponseDto> => {
            const { body } = await service.login(loginDto);
            return body;
          }
        );

      expect((await controller.login(null, null)).refreshToken).toMatch(
        'refreshToken'
      );
    });

    // 유저가 활성화 되어 있지 않을 때
    it('유저가 활성화 되어 있지 않을 때', async () => {
      jest.spyOn(service, 'verifyGoogleCredential').mockResolvedValue('1');
      jest.spyOn(usersService, 'getUserByGoogleId').mockResolvedValue(user4);

      try {
        await controller.login(null, null);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });

    // 구글 인증 에러
    it('구글 인증 에러', async () => {
      jest
        .spyOn(service, 'verifyGoogleCredential')
        .mockImplementation(async (loginDto: LoginRequestDto) => {
          throw new UnauthorizedException();
        });
      try {
        await controller.login(null, null);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });
  });

  describe('logout', () => {
    it('정상 동작', async () => {
      expect(await controller.logout()).toBeUndefined();
    });
  });

  describe('ft-oauth-callback', () => {
    const frontendURL = 'http://localhost:11900';
    // 정상 동작
    it('정상 동작', async () => {
      jest
        .spyOn(controller, 'ftOAuthRedirect')
        .mockImplementation(async (req: Request, res: Response) => {
          const newAccessToken = await service.ftOAuthRedirect('abc', null);

          const redirectURL = newAccessToken
            ? frontendURL
            : `${frontendURL}/logout`;
        });
      jest.spyOn(jwtService, 'verify').mockReturnValueOnce({
        googleId: '1',
        intraId: 99947,
      });
      jest
        .spyOn(usersService, 'getUserByGoogleId')
        .mockResolvedValueOnce(user1);
      jest
        .spyOn(usersService, 'getUserByIntraId')
        .mockResolvedValueOnce(intraUser1);
      jest.spyOn(usersService, 'saveUser').mockResolvedValue(null);
      expect(await controller.ftOAuthRedirect(null, null)).toBeUndefined();
    });

    // 유효하지 않은 토큰 에러
    it('유효하지 않은 토큰 에러', async () => {
      jest
        .spyOn(controller, 'ftOAuthRedirect')
        .mockImplementation(async (req: Request, res: Response) => {
          try {
            await service.ftOAuthRedirect('abc', null);
          } catch (error) {
            console.log(error);
          }
        });
      jest.spyOn(jwtService, 'verify').mockImplementation(() => {
        throw new UnauthorizedException();
      });
      expect(await controller.ftOAuthRedirect(null, null)).toBeUndefined();
    });

    // 구글 유저 없음 에러
    it('구글 유저 없음 에러', async () => {
      jest
        .spyOn(controller, 'ftOAuthRedirect')
        .mockImplementation(async (req: Request, res: Response) => {
          try {
            await service.ftOAuthRedirect('abc', null);
          } catch (error) {
            console.log(error);
          }
        });
      jest.spyOn(jwtService, 'verify').mockReturnValueOnce({
        googleId: '1',
        intraId: 99947,
      });
      jest.spyOn(usersService, 'getUserByGoogleId').mockResolvedValueOnce(null);
      expect(await controller.ftOAuthRedirect(null, null)).toBeUndefined();
    });

    // 인트라 유저 없음 에러
    it('인트라 유저 없음 에러', async () => {
      jest
        .spyOn(controller, 'ftOAuthRedirect')
        .mockImplementation(async (req: Request, res: Response) => {
          try {
            await service.ftOAuthRedirect('abc', null);
          } catch (error) {
            console.log(error);
          }
        });
      jest.spyOn(jwtService, 'verify').mockReturnValueOnce({
        googleId: '1',
        intraId: 99947,
      });
      jest
        .spyOn(usersService, 'getUserByGoogleId')
        .mockResolvedValueOnce(user1);
      jest.spyOn(usersService, 'getUserByIntraId').mockResolvedValueOnce(null);
      expect(await controller.ftOAuthRedirect(null, null)).toBeUndefined();
    });

    // 유저 저장 실패 에러
    it('유저 저장 실패 에러', async () => {
      jest
        .spyOn(controller, 'ftOAuthRedirect')
        .mockImplementation(async (req: Request, res: Response) => {
          try {
            await service.ftOAuthRedirect('abc', null);
          } catch (error) {
            console.log(error);
          }
        });
      jest.spyOn(jwtService, 'verify').mockReturnValueOnce({
        googleId: '1',
        intraId: 99947,
      });
      jest
        .spyOn(usersService, 'getUserByGoogleId')
        .mockResolvedValueOnce(user1);
      jest
        .spyOn(usersService, 'getUserByIntraId')
        .mockResolvedValueOnce(intraUser1);
      jest.spyOn(usersService, 'saveUser').mockImplementation(() => {
        throw new ServiceUnavailableException();
      });
      try {
        await service.ftOAuthRedirect(null, null);
      } catch (error) {
        expect(error).toBeInstanceOf(ServiceUnavailableException);
      }
    });
  });

  describe('tokenRefresh', () => {
    const refreshTokenPayload: RefreshTokenPayload = {
      googleId: '1',
      expirationTime: Date.now(),
    };

    // 정상동작
    it('정상 동작', async () => {
      jest.spyOn(usersService, 'getUserByGoogleId').mockResolvedValueOnce({
        id: '1',
        intra: intraUser1,
        refreshToken: 'abc',
      });

      jest
        .spyOn(controller, 'tokenRefresh')
        .mockImplementation(
          async (
            payload: RefreshTokenPayload,
            body: TokenRefreshDto,
            res: Response
          ) => {
            const accessToken = await service.tokenRefresh(payload);
            return;
          }
        );

      expect(
        await controller.tokenRefresh(
          refreshTokenPayload,
          { refreshToken: null },
          null
        )
      ).toBeUndefined();
    });

    // 유저 에러(null)
    it('유저 에러(null)', async () => {
      jest.spyOn(usersService, 'getUserByGoogleId').mockResolvedValueOnce(null);

      try {
        await controller.tokenRefresh(refreshTokenPayload, null, null);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    // 유저 에러(deactivated)
    it('유저 에러(deactivated)', async () => {
      jest.spyOn(usersService, 'getUserByGoogleId').mockResolvedValueOnce({
        id: '1',
        intra: intraUser2,
        refreshToken: 'abc',
      });
      try {
        await controller.tokenRefresh(refreshTokenPayload, null, null);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });
  });
});

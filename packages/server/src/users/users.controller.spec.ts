import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../database/database.module';
import { GetUserProfileDto } from './dto/getUserProfile.dto';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';
import { SubjectsModule } from '../subjects/subjects.module';
import { ConfigModule } from '@nestjs/config';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  // jest.setTimeout(30000);

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

    service = await moduleRef.resolve(UsersService);
    controller = moduleRef.get<UsersController>(UsersController);
  });

  describe('getUserProfile', () => {
    it('should return a user profile', async () => {
      const getUserProfileDto: GetUserProfileDto = {
        id: 1,
        imageUrl: 'https://image.com',
        name: 'test',
        login: 'test',
        rank: 5,
        level: 11.3,
        grade: 'learner',
        coalition: null,
        startedAt: new Date(),
        daysSinceStarted: 1,
        blackholedAt: null,
        daysUntilBlackholed: null,
      };

      jest
        .spyOn(service, 'getUserProfile')
        .mockImplementation(async (id: number) => {
          return getUserProfileDto;
        });

      expect(await controller.getUserProfile(99733)).toBeInstanceOf(Object);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { DatabaseModule } from '../database/database.module';
import { CoalitionsController } from './coalitions.controller';
import { coalitionsProviders } from './coalitions.providers';
import { CoalitionsService } from './coalitions.service';
import { GetCoalitionsDto } from './dto/getCoalition.dto';
import { Coalition } from './entity/coalition.entity';

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

describe('CoalitionsController', () => {
  let controller: CoalitionsController;
  // let service: CoalitionsService;
  let repository: Repository<Coalition>;
  // let scoreRepository: Repository<CoalitionScore>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [CoalitionsController],
      providers: [CoalitionsService, ...coalitionsProviders],
    })
      .overrideProvider('COALITION_SCORE_REPOSITORY')
      .useValue({
        createQueryBuilder: jest.fn().mockReturnThis(),
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([
          { score: 10, name: 'Gun' },
          { score: 20, name: 'Gon' },
          { score: 30, name: 'Gam' },
          { score: 40, name: 'Lee' },
        ]),
      })
      .compile();

    controller = module.get<CoalitionsController>(CoalitionsController);
    // service = module.get<CoalitionsService>(CoalitionsService);
    repository = module.get('COALITION_REPOSITORY');
    // scoreRepository = module.get('COALITION_SCORE_REPOSITORY');
  });

  describe('getCoalitions', () => {
    it('정상 작동', async () => {
      jest
        .spyOn(repository, 'find')
        .mockResolvedValue([coalition1, coalition2]);
      const result = await controller.getCoalitions();
      expect(result).toBeInstanceOf(GetCoalitionsDto);
    });
  });
});

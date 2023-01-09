import { Test, TestingModule } from '@nestjs/testing';
import { CoalitionsService } from './coalitions.service';

describe('CoalitionsService', () => {
  let service: CoalitionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoalitionsService],
    }).compile();

    service = module.get<CoalitionsService>(CoalitionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationsService } from './evaluations.service';

describe('EvaluationsService', () => {
  let service: EvaluationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvaluationsService],
    }).compile();

    service = module.get<EvaluationsService>(EvaluationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

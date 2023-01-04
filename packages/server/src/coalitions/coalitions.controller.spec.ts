import { Test, TestingModule } from '@nestjs/testing';
import { CoalitionsController } from './coalitions.controller';

describe('CoalitionsController', () => {
  let controller: CoalitionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoalitionsController],
    }).compile();

    controller = module.get<CoalitionsController>(CoalitionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

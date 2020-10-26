import { Test, TestingModule } from '@nestjs/testing';
import { MonthlyDistributionController } from './monthly-distribution.controller';

describe('MonthlyDistributionController', () => {
  let controller: MonthlyDistributionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonthlyDistributionController],
    }).compile();

    controller = module.get<MonthlyDistributionController>(MonthlyDistributionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

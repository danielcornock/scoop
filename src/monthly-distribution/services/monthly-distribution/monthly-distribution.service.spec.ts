import { Test, TestingModule } from '@nestjs/testing';
import { MonthlyDistributionService } from './monthly-distribution.service';

describe('MonthlyDistributionService', () => {
  let service: MonthlyDistributionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MonthlyDistributionService],
    }).compile();

    service = module.get<MonthlyDistributionService>(MonthlyDistributionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { SalaryPredictionService } from './salary-prediction.service';

describe('SalaryPredictionService', () => {
  let service: SalaryPredictionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalaryPredictionService],
    }).compile();

    service = module.get<SalaryPredictionService>(SalaryPredictionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

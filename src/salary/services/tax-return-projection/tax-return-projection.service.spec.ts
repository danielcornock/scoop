import { Test, TestingModule } from '@nestjs/testing';
import { TaxReturnProjectionService } from './tax-return-projection.service';

describe('TaxReturnProjectionService', () => {
  let service: TaxReturnProjectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaxReturnProjectionService],
    }).compile();

    service = module.get<TaxReturnProjectionService>(TaxReturnProjectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

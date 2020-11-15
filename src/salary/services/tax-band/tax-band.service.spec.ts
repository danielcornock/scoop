import { Test, TestingModule } from '@nestjs/testing';
import { TaxBandService } from './tax-band.service';

describe('TaxBandService', () => {
  let service: TaxBandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaxBandService],
    }).compile();

    service = module.get<TaxBandService>(TaxBandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

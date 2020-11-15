import { Test, TestingModule } from '@nestjs/testing';
import { IncomeTaxService } from './income-tax.service';

describe('IncomeTaxService', () => {
  let service: IncomeTaxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IncomeTaxService],
    }).compile();

    service = module.get<IncomeTaxService>(IncomeTaxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

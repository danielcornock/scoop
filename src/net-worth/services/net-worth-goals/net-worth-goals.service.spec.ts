import { Test, TestingModule } from '@nestjs/testing';
import { NetWorthGoalsService } from './net-worth-goals.service';

describe('NetWorthGoalsService', () => {
  let service: NetWorthGoalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NetWorthGoalsService],
    }).compile();

    service = module.get<NetWorthGoalsService>(NetWorthGoalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

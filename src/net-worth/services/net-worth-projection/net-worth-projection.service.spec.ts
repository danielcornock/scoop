import { Test, TestingModule } from '@nestjs/testing';
import { NetWorthProjectionService } from './net-worth-projection.service';

describe('NetWorthProjectionService', () => {
  let service: NetWorthProjectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NetWorthProjectionService],
    }).compile();

    service = module.get<NetWorthProjectionService>(NetWorthProjectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

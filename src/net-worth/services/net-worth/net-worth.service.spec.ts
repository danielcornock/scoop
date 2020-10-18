import { Test, TestingModule } from '@nestjs/testing';
import { NetWorthService } from './net-worth.service';

describe('NetWorthService', () => {
  let service: NetWorthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NetWorthService],
    }).compile();

    service = module.get<NetWorthService>(NetWorthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

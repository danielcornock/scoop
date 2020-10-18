import { Test, TestingModule } from '@nestjs/testing';
import { NetWorthController } from './net-worth.controller';

describe('NetWorthController', () => {
  let controller: NetWorthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NetWorthController],
    }).compile();

    controller = module.get<NetWorthController>(NetWorthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

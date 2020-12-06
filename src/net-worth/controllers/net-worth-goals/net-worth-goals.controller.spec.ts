import { Test, TestingModule } from '@nestjs/testing';
import { NetWorthGoalsController } from './net-worth-goals.controller';

describe('NetWorthGoalsController', () => {
  let controller: NetWorthGoalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NetWorthGoalsController],
    }).compile();

    controller = module.get<NetWorthGoalsController>(NetWorthGoalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { UserSettings } from '../../../auth/schemas/user-settings.schema';
import { DateService } from '../../../common/services/date/date.service';
import { UserSettingsService } from './user-settings.service';

describe('UserSettingsService', () => {
  let service: UserSettingsService,
    dependencies: {
      repo: { find: jest.Mock };
      dateService: { isLastDayOfTheMonth: jest.Mock; getCurrentDay: jest.Mock };
    };

  beforeEach(async () => {
    dependencies = {
      repo: { find: jest.fn() },
      dateService: { isLastDayOfTheMonth: jest.fn(), getCurrentDay: jest.fn() }
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserSettingsService,
        {
          provide: getModelToken(UserSettings.name),
          useValue: dependencies.repo
        },
        {
          provide: DateService,
          useValue: dependencies.dateService
        }
      ]
    }).compile();

    service = module.get<UserSettingsService>(UserSettingsService);
  });

  describe('getUsersWithNotificationsForToday', () => {
    describe('when the current day is not the last day of the month', () => {
      beforeEach(async () => {
        dependencies.dateService.getCurrentDay.mockReturnValue(10);
        dependencies.dateService.isLastDayOfTheMonth.mockReturnValue(false);
        dependencies.repo.find.mockReturnValue({
          populate: jest.fn().mockResolvedValue([])
        });

        await service.getUsersWithNotificationForToday();
      });

      it('should query for the current day', () => {
        expect(dependencies.repo.find).toHaveBeenCalledWith({
          $or: [{ reminderDate: 10 }]
        });
      });
    });

    describe('when the current day is the 31st', () => {
      beforeEach(async () => {
        dependencies.dateService.getCurrentDay.mockReturnValue(31);
        dependencies.dateService.isLastDayOfTheMonth.mockReturnValue(true);
        dependencies.repo.find.mockReturnValue({
          populate: jest.fn().mockResolvedValue([])
        });

        await service.getUsersWithNotificationForToday();
      });

      it('should query for the current day', () => {
        expect(dependencies.repo.find).toHaveBeenCalledWith({
          $or: [{ reminderDate: 31 }]
        });
      });
    });

    describe('when the current day is the 28th and it is the last day of the month', () => {
      beforeEach(async () => {
        dependencies.dateService.getCurrentDay.mockReturnValue(28);
        dependencies.dateService.isLastDayOfTheMonth.mockReturnValue(true);
        dependencies.repo.find.mockReturnValue({
          populate: jest.fn().mockResolvedValue([])
        });

        await service.getUsersWithNotificationForToday();
      });

      it('should query for all days between the 28th and the 31st', () => {
        expect(dependencies.repo.find).toHaveBeenCalledWith({
          $or: [
            { reminderDate: 28 },
            { reminderDate: 29 },
            { reminderDate: 30 },
            { reminderDate: 31 }
          ]
        });
      });
    });
  });
});

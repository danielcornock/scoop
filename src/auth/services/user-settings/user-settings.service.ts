import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { range } from 'lodash';
import { Model } from 'mongoose';

import { UserSettings } from '../../../auth/schemas/user-settings.schema';
import { User } from '../../../auth/schemas/user.schema';
import { UpdateUserSettingsRequest } from '../../../auth/transfer-objects/update-user-settings-request.dto';
import { DateService } from '../../../common/services/date/date.service';
import { IEmailUserDetails, IUserNotificationsList } from './interfaces/user-notifications-list.interface';

@Injectable()
export class UserSettingsService {
  @InjectModel(UserSettings.name)
  private readonly _userSettingsRepo: Model<UserSettings>;

  constructor(private readonly _dateService: DateService) {}

  public async createSettings(user: string): Promise<UserSettings> {
    const settings = await this._userSettingsRepo.create({
      user
    });

    return settings;
  }

  public async getSettings(user: string) {
    const settings = await this._userSettingsRepo.findOne({ user });

    if (settings) {
      return settings;
    } else {
      return this.createSettings(user);
    }
  }

  public async getUsersWithNotificationForToday(): Promise<
    IUserNotificationsList
  > {
    const userSettingsWithReminderToday = await this._getUsersWithReminderToday();

    const userIdsForAppNotification: Array<string> = userSettingsWithReminderToday.map(
      (settings) => (settings.user as User)._id.toHexString()
    );

    const userEmailsForEmailNotification = this._getUserEmailsForEmailNotifications(
      userSettingsWithReminderToday
    );

    return {
      userIdsForAppNotification,
      userEmailsForEmailNotification
    };
  }

  public async getUsersWithEmailNewslettersActive(): Promise<Array<string>> {
    const users = await this._userSettingsRepo
      .find({ enableEmailNewsletters: true })
      .populate('user');

    return users
      .filter((settings) => (settings.user as User).isVerified)
      .map((settings) => (settings.user as User).email);
  }

  public async deleteSettings(user: string): Promise<void> {
    await this._userSettingsRepo.deleteOne({ user });
  }

  public async getPreferredCurrency(user: string): Promise<string> {
    const settings = await this.getSettings(user);

    return settings.preferredCurrency;
  }

  public async updateSettings(
    values: UpdateUserSettingsRequest,
    user: string
  ): Promise<UserSettings> {
    const updatedSettings = await this._userSettingsRepo.findOneAndUpdate(
      { user },
      values,
      { new: true }
    );

    return updatedSettings;
  }

  private async _getUsersWithReminderToday(): Promise<UserSettings[]> {
    const currentDay = this._dateService.getCurrentDay();

    let datesQuery: Array<{ reminderDate: number }>;

    /* If its the last day of the month, fetch all reminder dates that fall after this day on this month */
    if (this._dateService.isLastDayOfTheMonth()) {
      datesQuery = range(currentDay, 32).map((day) => ({ reminderDate: day }));
    } else {
      datesQuery = [{ reminderDate: currentDay }];
    }

    const settings = await this._userSettingsRepo
      .find({
        $or: datesQuery
      })
      .populate('user');

    return settings;
  }

  private _getUserEmailsForEmailNotifications(
    userSettingsWithReminderToday: Array<UserSettings>
  ): Array<IEmailUserDetails> {
    return userSettingsWithReminderToday
      .filter((settings: UserSettings) => settings.enableEmailNotifications)
      .map((settings) => ({
        email: (settings.user as User).email,
        name: (settings.user as User).name
      }));
  }
}

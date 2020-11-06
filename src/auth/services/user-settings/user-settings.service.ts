import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSettings } from 'src/auth/schemas/user-settings.schema';
import { User } from 'src/auth/schemas/user.schema';
import { UpdateUserSettingsRequest } from 'src/auth/transfer-objects/update-user-settings-request.dto';

import { IUserNotificationsList } from './interfaces/user-notifications-list.interface';

@Injectable()
export class UserSettingsService {
  @InjectModel(UserSettings.name)
  private readonly _userSettingsRepo: Model<UserSettings>;

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
    const currentDate: Date = new Date(Date.now());
    const currentDay = currentDate.getDate().toString();

    const userSettingsWithReminderToday = await this._userSettingsRepo
      .find({
        $or: [{ reminderDate: currentDay }, { reminderDate: '0' + currentDay }]
      })
      .populate('user');

    const userIdsForAppNotification: Array<string> = userSettingsWithReminderToday.map(
      (settings) => (settings.user as User)._id.toHexString()
    );

    const userEmailsForEmailNotification = userSettingsWithReminderToday
      .filter((settings: UserSettings) => settings.enableEmailNotifications)
      .map((settings) => ({
        email: (settings.user as User).email,
        name: (settings.user as User).name
      }));

    return {
      userIdsForAppNotification,
      userEmailsForEmailNotification
    };
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
}

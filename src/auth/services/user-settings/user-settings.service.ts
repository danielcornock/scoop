import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSettings } from 'src/auth/schemas/user-settings.schema';
import { UpdateUserSettingsRequest } from 'src/auth/transfer-objects/update-user-settings-request.dto';

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

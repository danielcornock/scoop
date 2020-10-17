import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Settings } from 'src/settings/schemas/settings.schema';
import { UpdateSettings } from 'src/settings/transfer-objects/update-settings.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Settings.name)
    private readonly _settingsRepo: Model<Settings>
  ) {}

  public async createSettings(userId: string): Promise<Settings> {
    const settings = await this._settingsRepo.create({
      user: userId,
      netWorthFields: ['savings', 'investments']
    });

    return settings;
  }

  public async updateSettings(
    user: string,
    data: UpdateSettings
  ): Promise<Settings> {
    const settings = await this._settingsRepo.findOneAndUpdate({ user }, data, {
      new: true
    });

    return settings;
  }

  public async getSettings(user: string): Promise<Settings> {
    const settings = await this._settingsRepo.findOne({ user });

    return settings;
  }
}

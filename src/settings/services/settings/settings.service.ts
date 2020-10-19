import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Settings } from 'src/settings/schemas/settings.schema';
import { UpdateSettings } from 'src/settings/transfer-objects/update-settings.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Settings.name)
    private readonly _settingsRepo: Model<Settings>
  ) {}

  public async createSettings(rawUserId: Types.ObjectId): Promise<Settings> {
    const userId = rawUserId.toHexString();

    const settings = await this._settingsRepo.create({
      user: userId,
      ...defaultSettingsConfig
    });

    return settings;
  }

  public async updateSettings(
    user: string,
    data: UpdateSettings
  ): Promise<Settings> {
    this._checkValidityOfSettings(data);

    const settings = await this._settingsRepo.findOneAndUpdate({ user }, data, {
      new: true
    });

    return settings;
  }

  public async getSettings(user: string): Promise<Settings> {
    const settings = await this._settingsRepo.findOne({ user });

    return settings;
  }

  private _checkValidityOfSettings(settings: UpdateSettings): void {
    if (settings.netWorthSummaryItems.length !== 4) {
      throw new BadRequestException(
        'You must have exactly 4 summary options selected for net worth.'
      );
    }
  }
}

export const defaultSettingsConfig = {
  netWorthFields: ['savings', 'investments'],
  netWorthSummaryItems: [
    { label: 'Savings', sumOf: ['savings'] },
    { label: 'Investments', sumOf: ['investments'] },
    { label: 'Change this month', sumOf: ['change'] },
    { label: 'Net Worth', sumOf: ['total'] }
  ],
  netWorthSummaryOptions: []
};

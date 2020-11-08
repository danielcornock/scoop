import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dictionary, isString, reduce } from 'lodash';
import { Model } from 'mongoose';
import { defaultSettingsConfig } from 'src/settings/constants/default-settings-config.constant';
import { Settings } from 'src/settings/schemas/settings.schema';
import { UpdateSettings } from 'src/settings/transfer-objects/update-settings.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Settings.name)
    private readonly _settingsRepo: Model<Settings>
  ) {}

  public async createSettings(user: string): Promise<Settings> {
    const settings = await this._settingsRepo.create({
      user,
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

    if (settings) {
      return settings;
    } else {
      return this.createSettings(user);
    }
  }

  public async deleteSettings(user: string): Promise<void> {
    await this._settingsRepo.deleteOne({ user });
  }

  public processCustomValues(
    entry: any,
    fields: Array<string>
  ): Dictionary<number> {
    const values = {};

    fields.forEach((val) => {
      const numberField = entry[val];

      if (!numberField) {
        values[val] = 0;
      } else if (isString(numberField)) {
        values[val] = parseFloat(entry[val]);
      } else {
        values[val] = numberField;
      }
    });

    return values;
  }

  public getCustomValuesSum(values: Dictionary<number>): number {
    return reduce(
      values,
      (accum: number, next: number) => {
        return accum + next;
      },
      0
    );
  }

  private _checkValidityOfSettings(settings: UpdateSettings): void {
    if (settings.netWorthSummaryItems.length !== 4) {
      throw new BadRequestException(
        'You must have exactly 4 summary options selected for net worth.'
      );
    }
  }
}

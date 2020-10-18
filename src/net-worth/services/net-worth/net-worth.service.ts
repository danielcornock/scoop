import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { reduce } from 'lodash';
import { Model } from 'mongoose';
import { INetWorthCustomValues } from 'src/net-worth/interfaces/net-worth-log.interface';
import { NetWorth } from 'src/net-worth/schemas/net-worth.schema';
import { INetWorthCreate } from 'src/net-worth/transfer-objects/net-worth-create.dto';
import { NetWorthResponse } from 'src/net-worth/transfer-objects/net-worth-response.dto';
import { SettingsService } from 'src/settings/services/settings/settings.service';

@Injectable()
export class NetWorthService {
  constructor(
    @InjectModel(NetWorth.name)
    private readonly _netWorthRepo: Model<NetWorth>,
    private readonly _settingsService: SettingsService
  ) {}

  public async createEntry(
    entry: INetWorthCreate,
    user: string
  ): Promise<NetWorth> {
    await this._checkForExistingEntriesForChosenMonth(user, entry.date);

    const settings = await this._settingsService.getSettings(user);
    const customValues = this._processCustomValues(
      entry,
      settings.netWorthFields
    );
    const sumOfCustomValues = this._getCustomValuesSum(customValues);

    const data = this._netWorthRepo.create({
      date: entry.date,
      user,
      customValues,
      total: sumOfCustomValues
    });

    return data;
  }

  public async getAll(user: string): Promise<NetWorthResponse[]> {
    const allEntries = await this._netWorthRepo
      .find({ user })
      .sort({ date: 'desc' });

    return allEntries.map(
      (entry: NetWorth, index: number, array: NetWorth[]) => {
        const lastMonthTotal = array[index + 1]?.total;
        return {
          ...entry.toObject(),
          change: lastMonthTotal ? entry.total - lastMonthTotal : 0
        };
      }
    );
  }

  private async _checkForExistingEntriesForChosenMonth(
    user: string,
    date: string
  ): Promise<void> {
    const foundUser = await this._netWorthRepo.findOne({
      user,
      date
    });

    if (foundUser) {
      throw new BadRequestException(
        'An entry already exists for that month. Please remove your original entry if you wish to overwite it.'
      );
    }
  }

  private _getCustomValuesSum(values: INetWorthCustomValues): number {
    return reduce(
      values,
      (accum: number, next: number) => {
        return accum + next;
      },
      0
    );
  }

  private _processCustomValues(
    entry: INetWorthCreate,
    fields: Array<string>
  ): INetWorthCustomValues {
    const values = {};

    fields.forEach((val) => {
      const numberField = parseFloat(entry[val]);

      if (isNaN(numberField)) {
        values[val] = 0;
      } else {
        values[val] = numberField;
      }
    });

    return values;
  }
}

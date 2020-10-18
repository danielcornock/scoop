import { Injectable } from '@nestjs/common';
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
        return {
          ...entry.toObject(),
          change: entry.total - (array[index + 1]?.total ?? 0)
        };
      }
    );
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
      values[val] = parseInt(entry[val]);
    });

    return values;
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { defaultIcons } from 'src/common/constants/default-icons.constant';
import { INetWorthCustomValues } from 'src/net-worth/interfaces/net-worth-log.interface';
import { NetWorth } from 'src/net-worth/schemas/net-worth.schema';
import { INetWorthCreate } from 'src/net-worth/transfer-objects/net-worth-create.dto';
import { NetWorthResponse } from 'src/net-worth/transfer-objects/net-worth-response.dto';
import { INetWorthSummaryItemConfig } from 'src/settings/interfaces/net-worth-summary-item-config.interface';
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
    await this._checkIfEntryForMonthExists(user, entry.date);

    const settings = await this._settingsService.getSettings(user);
    const customValues = this._settingsService.processCustomValues(
      entry,
      settings.netWorthFields
    );
    const sumOfAllFields = this._settingsService.getCustomValuesSum(
      customValues
    );

    const data = this._netWorthRepo.create({
      date: entry.date,
      user,
      customValues,
      total: sumOfAllFields
    });

    return data;
  }

  public async updateLogByDate(
    date: string,
    data: INetWorthCustomValues,
    user: string
  ): Promise<NetWorth> {
    const customValues = this._settingsService.processCustomValues(
      data,
      Object.keys(data)
    );
    const sumOfAllFields = this._settingsService.getCustomValuesSum(
      customValues
    );
    const newNetWorthLog = {
      customValues,
      total: sumOfAllFields
    };

    const newData = await this._netWorthRepo.findOneAndUpdate(
      { date, user },
      newNetWorthLog,
      {
        new: true
      }
    );

    return newData;
  }

  public async getNetWorthLogEntry(
    date: string,
    user: string
  ): Promise<NetWorth> {
    const entry = await this._netWorthRepo.findOne({ date, user });

    return entry;
  }

  public getSummaryItemsMeta(
    entry: NetWorthResponse,
    summaryItems: INetWorthSummaryItemConfig[]
  ): { label: string; value: number; icon: string }[] {
    if (!entry) {
      return null;
    }

    return summaryItems.map((item, index) => {
      let accumValue = 0;

      item.sumOf.forEach((field) => {
        const fieldValue = entry[field] || entry.customValues[field] || 0;
        accumValue += fieldValue;
      });

      return {
        label: item.label,
        value: accumValue,
        icon: item.icon || defaultIcons[index]
      };
    });
  }

  public async deleteOne(user: string, date: string): Promise<void> {
    await this._netWorthRepo.deleteOne({ user, date });
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

  public getSortedAndGroupedValues(
    item: INetWorthCustomValues,
    fields: Array<string>
  ): Array<{ value: number; label: string }> {
    const arrayOfFields = fields
      .map((fieldName) => {
        return { label: fieldName, value: item[fieldName] };
      })
      .sort((a, b) => b.value - a.value);

    if (arrayOfFields.length <= 6) {
      return arrayOfFields;
    } else {
      /* Take the top 5 values */
      const topValues = arrayOfFields.splice(0, 5);

      /* Reduce the remaining values down to a single value */
      const reducedValues = arrayOfFields.reduce((accum, next) => {
        return (accum += next.value);
      }, 0);

      /* Return the top 5 values alongside 'other' */
      return [...topValues, { label: 'Other', value: reducedValues }];
    }
  }

  public async getAllFieldsFromCurrentResourceAndActiveFields(
    userId: string,
    resourceToEdit: NetWorth
  ): Promise<Array<string>> {
    const settings = await this._settingsService.getSettings(userId);

    return [
      ...new Set([
        ...settings.netWorthFields,
        ...Object.keys(resourceToEdit.customValues)
      ])
    ];
  }

  public async removeAllAssociatedEntries(user: string): Promise<void> {
    await this._netWorthRepo.deleteMany({ user });
  }

  private async _checkIfEntryForMonthExists(
    user: string,
    date: string
  ): Promise<void> {
    const foundEntry = await this._netWorthRepo.findOne({
      user,
      date
    });

    if (foundEntry) {
      throw new BadRequestException(
        'An entry already exists for that month. Please remove your original entry if you wish to overwite it.'
      );
    }
  }
}

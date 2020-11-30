import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { first, range } from 'lodash';
import { Model } from 'mongoose';
import { BaseLogService } from 'src/common/abstracts/base-log.service';
import { defaultIcons } from 'src/common/constants/default-icons.constant';
import { DateInstance } from 'src/common/instances/date-instance';
import { ILabelValue } from 'src/common/interfaces/label-value.interface';
import { MathsService } from 'src/common/services/maths/maths.service';
import { INetWorthCustomValues } from 'src/net-worth/interfaces/net-worth-log.interface';
import { NetWorth } from 'src/net-worth/schemas/net-worth.schema';
import { INetWorthCreate } from 'src/net-worth/transfer-objects/net-worth-create.dto';
import { NetWorthResponse } from 'src/net-worth/transfer-objects/net-worth-response.dto';
import { INetWorthSummaryItemConfig } from 'src/settings/interfaces/net-worth-summary-item-config.interface';
import { SettingsService } from 'src/settings/services/settings/settings.service';

@Injectable()
export class NetWorthService extends BaseLogService<NetWorth> {
  constructor(
    @InjectModel(NetWorth.name)
    netWorthRepo: Model<NetWorth>,
    private readonly _settingsService: SettingsService
  ) {
    super(netWorthRepo);
  }

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

    const data = this._repo.create({
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

    const newData = await this._repo.findOneAndUpdate(
      { date, user },
      newNetWorthLog,
      {
        new: true
      }
    );

    return newData;
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

  public async getAll(user: string): Promise<NetWorthResponse[]> {
    const allEntries = await super.getAllSorted(user);

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
  ): Array<ILabelValue> {
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

  public getProjectedNetWorth(
    collection: NetWorthResponse[]
  ): Array<ILabelValue> {
    if (!collection?.length) {
      return null;
    }

    const last3Entries = collection.slice(0, 3);

    let amountToDivideBy = last3Entries.length;

    if (collection.length <= 3 && first(last3Entries).change === 0) {
      amountToDivideBy = collection.length - 1;
    }

    const last3MonthsAvgChange =
      last3Entries.reduce((accum, { change }) => {
        return accum + change;
      }, 0) / amountToDivideBy;

    const lastEntry = first(collection);
    const lastEntryDate = new DateInstance(lastEntry.date).toISOString();

    return range(0, 4).map((index) => {
      const newDate = new DateInstance(lastEntryDate);
      newDate.addMonths(index);
      const changeThisMonth = MathsService.round0(last3MonthsAvgChange * index);

      return {
        value: lastEntry.total + changeThisMonth,
        label: newDate.getYearMonth()
      };
    });
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
    await this._repo.deleteMany({ user });
  }
}

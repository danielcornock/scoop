import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dictionary, forEach } from 'lodash';
import { Model } from 'mongoose';
import { BaseLogService } from 'src/common/abstracts/base-log.service';
import { MonthlyDistribution } from 'src/monthly-distribution/schemas/monthly-distribution.schema';
import { MonthlyDistributionCreate } from 'src/monthly-distribution/transfer-objects/monthly-distribution-create.dto';
import { SettingsService } from 'src/settings/services/settings/settings.service';

@Injectable()
export class MonthlyDistributionService extends BaseLogService<
  MonthlyDistribution
> {
  constructor(
    @InjectModel(MonthlyDistribution.name)
    monthlyDistributionRepo: Model<MonthlyDistribution>,
    private readonly _settingsService: SettingsService
  ) {
    super(monthlyDistributionRepo);
  }

  public async createEntry(entry: MonthlyDistributionCreate, user: string) {
    await this._checkIfEntryForMonthExists(user, entry.date);

    const { income, outgoing } = await this._processIncomeAndOutGoing(
      entry,
      user
    );

    const remaining =
      this._settingsService.getCustomValuesSum(income) -
      this._settingsService.getCustomValuesSum(outgoing);

    const data = this._repo.create({
      date: entry.date,
      outgoing,
      income,
      user,
      remaining
    });

    return data;
  }

  public getAllTimeDistribution(
    items: MonthlyDistribution[]
  ): Dictionary<number> {
    return items.reduce((prev, current) => {
      forEach(current.outgoing, (value, key) => {
        prev[key] = value + (prev[key] || 0);
      });

      return prev;
    }, {});
  }

  public async getSingleResource(
    date: string,
    user: string
  ): Promise<MonthlyDistribution> {
    const entry = await this._repo.findOne({ date, user });

    return entry;
  }

  public async updateLogByDate(
    date: string,
    income: Dictionary<number>,
    outgoing: Dictionary<number>,
    user: string
  ): Promise<MonthlyDistribution> {
    const incomeValues = this._settingsService.processCustomValues(
      income,
      Object.keys(income)
    );
    const outgoingValues = this._settingsService.processCustomValues(
      outgoing,
      Object.keys(outgoing)
    );

    const remaining =
      this._settingsService.getCustomValuesSum(incomeValues) -
      this._settingsService.getCustomValuesSum(outgoingValues);

    const newMonthlyDistributionLog = {
      income,
      outgoing,
      remaining
    };

    const newData = await this._repo.findOneAndUpdate(
      { date, user },
      newMonthlyDistributionLog,
      {
        new: true
      }
    );

    return newData;
  }

  public async getAllFieldsFromCurrentResourceAndActiveFields(
    existingEntries: Dictionary<number>,
    settingsFields: string[]
  ): Promise<Array<string>> {
    return [...new Set([...settingsFields, ...Object.keys(existingEntries)])];
  }

  public getUncommittedSpendingChartData(
    items: MonthlyDistribution[]
  ): Array<{ date: string; value: number }> {
    const data = items.map((item, index, arr) => {
      if (!arr[index - 1]) {
        return;
      }

      return {
        date: arr[index].date,
        value: item.remaining - arr[index - 1].income['balance carried']
      };
    });

    /* First entry is a bogus one */
    data.shift();

    return data;
  }

  private async _processIncomeAndOutGoing(
    entry: MonthlyDistributionCreate,
    user: string
  ): Promise<{ income: Dictionary<number>; outgoing: Dictionary<number> }> {
    const settings = await this._settingsService.getSettings(user);

    const outgoing = this._settingsService.processCustomValues(
      entry.outgoing,
      settings.monthlyDistributionOutgoingFields
    );

    const income = this._settingsService.processCustomValues(
      entry.income,
      settings.monthlyDistributionIncomeFields
    );

    return { outgoing, income };
  }
}

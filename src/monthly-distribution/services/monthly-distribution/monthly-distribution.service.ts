import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dictionary } from 'lodash';
import { Model } from 'mongoose';
import { MonthlyDistribution } from 'src/monthly-distribution/schemas/monthly-distribution.schema';
import { MonthlyDistributionCreate } from 'src/monthly-distribution/transfer-objects/monthly-distribution-create.dto';
import { SettingsService } from 'src/settings/services/settings/settings.service';

@Injectable()
export class MonthlyDistributionService {
  constructor(
    @InjectModel(MonthlyDistribution.name)
    private readonly _monthlyDistributionRepo: Model<MonthlyDistribution>,
    private readonly _settingsService: SettingsService
  ) {}

  public async createEntry(entry: MonthlyDistributionCreate, user: string) {
    await this._checkIfEntryForMonthExists(user, entry.date);

    const { income, outgoing } = await this._processIncomeAndOutGoing(
      entry,
      user
    );

    const remaining =
      this._settingsService.getCustomValuesSum(income) -
      this._settingsService.getCustomValuesSum(outgoing);

    const data = this._monthlyDistributionRepo.create({
      date: entry.date,
      outgoing,
      income,
      user,
      remaining
    });

    return data;
  }

  public async deleteOne(user: string, date: string): Promise<void> {
    await this._monthlyDistributionRepo.deleteOne({ user, date });
  }
  public async getAll(user: string): Promise<MonthlyDistribution[]> {
    const data = await this._monthlyDistributionRepo
      .find({ user })
      .sort({ date: 'desc' });

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

  private async _checkIfEntryForMonthExists(
    user: string,
    date: string
  ): Promise<void> {
    const foundEntry = await this._monthlyDistributionRepo.findOne({
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

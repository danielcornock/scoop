import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MathsService } from 'src/common/services/maths/maths.service';
import { Investment } from 'src/investments/schemas/investments.schema';
import { InvestmentResponse } from 'src/investments/transfer-objects/investment-response.dto';

import { InvestmentCreate } from '../../transfer-objects/investment-create.dto';

@Injectable()
export class InvestmentsService {
  constructor(
    @InjectModel(Investment.name)
    private readonly _investmentsRepo: Model<Investment>
  ) {}

  public async createLog(
    data: InvestmentCreate,
    user: string
  ): Promise<Investment> {
    await this._checkIfEntryForMonthExists(user, data.date);
    const [lastEntry] = await this.getAll(user);
    const addedSinceLast = parseFloat(data.addedSinceLast);
    const totalValue = parseFloat(data.totalValue);
    const totalInvested = lastEntry
      ? lastEntry.totalInvested + addedSinceLast
      : addedSinceLast;

    return this._investmentsRepo.create({
      date: data.date,
      addedSinceLast,
      totalValue,
      user,
      profit: totalValue - totalInvested,
      profitPercentage: MathsService.getPercentageDifference(
        totalValue,
        totalInvested
      ),
      totalInvested
    });
  }

  public async deleteOne(user: string, date: string): Promise<void> {
    await this._investmentsRepo.deleteOne({ user, date });
  }

  public async removeAllAssociatedEntries(user: string): Promise<void> {
    await this._investmentsRepo.deleteMany({ user });
  }

  public async getAll(user: string): Promise<InvestmentResponse[]> {
    const investments = await this._investmentsRepo
      .find({ user })
      .sort({ date: 'desc' });

    return investments.map(this._mapInvestmentReturn.bind(this));
  }

  private _mapInvestmentReturn(
    item: Investment,
    index: number,
    arr: Investment[]
  ): InvestmentResponse {
    const previousItem = arr[index + 1];
    const profitChangeSinceLast = previousItem
      ? item.profit - previousItem.profit
      : 0;

    return {
      ...item.toObject(),
      profitChangeSinceLast
    };
  }

  private async _checkIfEntryForMonthExists(
    user: string,
    date: string
  ): Promise<void> {
    const foundEntry = await this._investmentsRepo.findOne({
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

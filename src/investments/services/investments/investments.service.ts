import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseLogService } from 'src/common/abstracts/base-log.service';
import { MathsService } from 'src/common/services/maths/maths.service';
import { Investment } from 'src/investments/schemas/investments.schema';
import { InvestmentResponse } from 'src/investments/transfer-objects/investment-response.dto';

import { InvestmentCreate } from '../../transfer-objects/investment-create.dto';

@Injectable()
export class InvestmentsService extends BaseLogService<Investment> {
  constructor(
    @InjectModel(Investment.name)
    investmentsRepo: Model<Investment>
  ) {
    super(investmentsRepo);
  }

  public async createLog(
    data: InvestmentCreate,
    user: string
  ): Promise<Investment> {
    await this._checkIfEntryForMonthExists(user, data.date);
    const [lastEntry] = await this.getAll(user);
    const totalInvested = lastEntry
      ? lastEntry.totalInvested + data.addedSinceLast
      : data.addedSinceLast;

    return this._repo.create({
      date: data.date,
      addedSinceLast: data.addedSinceLast,
      totalValue: data.totalValue,
      user,
      profit: data.totalValue - totalInvested,
      profitPercentage: MathsService.getPercentageDifference(
        data.totalValue,
        totalInvested
      ),
      totalInvested
    });
  }

  public async getAll(user: string): Promise<InvestmentResponse[]> {
    const investments = await super.getAllSorted(user);

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
}

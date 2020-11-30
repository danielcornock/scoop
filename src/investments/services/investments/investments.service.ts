import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isUndefined } from 'lodash';
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

    return this._repo.create({
      date: data.date,
      addedSinceLast: data.addedSinceLast,
      totalValue: data.totalValue,
      user
    });
  }

  public async getAll(user: string): Promise<InvestmentResponse[]> {
    const investments = await this._repo.find({ user }).sort({ date: 'asc' });

    let totalInvested = 0;
    let lastItemProfit;

    return investments
      .map((item) => {
        totalInvested += item.addedSinceLast;
        const profit = item.totalValue - totalInvested;

        const profitChangeSinceLast = !isUndefined(lastItemProfit)
          ? profit - lastItemProfit
          : 0;

        const profitPercentage = MathsService.getPercentageDifference(
          item.totalValue,
          totalInvested
        );

        lastItemProfit = profit;

        return {
          ...item.toObject(),
          profitChangeSinceLast,
          totalInvested,
          profit,
          profitPercentage
        };
      })
      .reverse();
  }
}

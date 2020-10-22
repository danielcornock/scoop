import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Investment } from 'src/investments/schemas/investments.schema';
import { InvestmentResponse } from 'src/investments/transfer-objects/investment-response.dto';

import { InvestmentCreate } from '../../transfer-objects/investment-create.dto';

@Injectable()
export class InvestmentsService {
  constructor(
    @InjectModel(Investment.name)
    private readonly _investmentsRepo: Model<Investment>
  ) {}

  public createLog(data: InvestmentCreate, user: string): Promise<Investment> {
    return this._investmentsRepo.create({
      ...data,
      user,
      profit: data.totalValue - data.totalInvested,
      profitPercentage: data.totalValue / data.totalInvested
    });
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
  ) {
    const previousItem = arr[index + 1];
    const addedSinceLast = previousItem
      ? item.totalInvested - previousItem.totalInvested
      : 0;
    const profitChangeSinceLast = previousItem
      ? item.profit - previousItem.profit
      : 0;
    const profitPercentageChangeSinceLast = previousItem
      ? item.profit / previousItem.profit
      : 0;

    return {
      ...item.toObject(),
      addedSinceLast,
      profitChangeSinceLast,
      profitPercentageChangeSinceLast
    };
  }
}

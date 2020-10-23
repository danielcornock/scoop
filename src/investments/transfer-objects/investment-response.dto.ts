import { BaseModel } from 'src/common/transfer-objects/base-model.dto';

export class InvestmentResponse extends BaseModel {
  user: string;
  date: string;
  totalInvested: number;
  totalValue: number;
  profit: number;
  profitPercentage: number;
  addedSinceLast: number;
  profitChangeSinceLast: number;
}

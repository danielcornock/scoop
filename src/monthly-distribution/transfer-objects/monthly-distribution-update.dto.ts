import { IsObject } from 'class-validator';
import { Dictionary } from 'lodash';

export class MonthlyDistributionUpdate {
  @IsObject()
  income: Dictionary<number>;

  @IsObject()
  outgoing: Dictionary<number>;
}

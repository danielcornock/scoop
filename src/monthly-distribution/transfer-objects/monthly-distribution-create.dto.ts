import { IsObject, IsString } from 'class-validator';
import { Dictionary } from 'lodash';

export class MonthlyDistributionCreate {
  @IsString()
  date: string;

  @IsObject()
  income: Dictionary<number>;

  @IsObject()
  outgoing: Dictionary<number>;
}

import { IsArray } from 'class-validator';

import { INetWorthSummaryItemConfig } from '../interfaces/net-worth-summary-item-config.interface';

export class UpdateSettings {
  @IsArray()
  netWorthFields: Array<string>;

  @IsArray()
  netWorthSummaryItems: INetWorthSummaryItemConfig[];

  @IsArray()
  netWorthSummaryOptions: INetWorthSummaryItemConfig[];
}

import { ILabelValue } from 'src/common/interfaces/label-value.interface';

import { NetWorthGoalResponse } from '../transfer-objects/net-worth-goal-response.dto';
import { INetWorthSummaryItem } from './net-worth-summary-item.interface';

export interface INetWorthMeta {
  fields: Array<string>;
  summaryItems: Array<INetWorthSummaryItem>;
  preferredCurrency: string;
  barChartData?: Array<ILabelValue>;
  projectedNetWorth: Array<ILabelValue>;
  goals: Array<NetWorthGoalResponse>;
  goalsFields: Array<string>;
}

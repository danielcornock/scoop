import { INetWorthSummaryItem } from './net-worth-summary-item.interface';

export interface INetWorthMeta {
  fields: Array<string>;
  summaryItems: Array<INetWorthSummaryItem>;
  preferredCurrency: string;
}

import { INetWorthCustomValues } from '../interfaces/net-worth-log.interface';

export class NetWorthResponse {
  date: string;
  total: number;
  change: number;
  customValues: INetWorthCustomValues;
}

import { INetWorthCustomValues } from './net-worth-log.interface';

export interface INetWorthUpdate {
  date: string;
  customValues: INetWorthCustomValues;
}

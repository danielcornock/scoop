import { Dictionary } from 'lodash';

export type INotification = IDynamicNotification | IStaticNotification;

export interface IDynamicNotification {
  name: string;
  title(args: Dictionary<string>): string;
  text(args: Dictionary<string>): string;
}

export interface IStaticNotification {
  name: string;
  title: string;
  text: string;
}

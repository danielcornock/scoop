import { BaseModel } from 'src/common/transfer-objects/base-model.dto';

import { INetWorthCustomValues } from '../interfaces/net-worth-log.interface';

export class NetWorthResponse extends BaseModel {
  date: string;
  total: number;
  change: number;
  customValues: INetWorthCustomValues;
}

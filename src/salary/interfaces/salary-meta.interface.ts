import { Dictionary } from 'lodash';

export interface ISalaryMeta {
  preferredCurrency: string;
  fields: Dictionary<string>;
}

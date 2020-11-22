import { Dictionary } from 'lodash';

import { Salary } from '../schemas/salary.schema';

export interface ISalaryMeta {
  preferredCurrency: string;
  fields: Dictionary<string>;
  summaryItems: Dictionary<number>;
  latestDeductions: Partial<Salary>;
}

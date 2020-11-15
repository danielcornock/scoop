import { Dictionary } from 'lodash';

import { TaxBands } from '../interfaces/tax-band.interface';

export const studentLoanPlan2Bands: Dictionary<TaxBands> = {
  2020: [
    { min: 0, max: 26575, percentage: 0 },
    { min: 26575, max: Infinity, percentage: 0.09 }
  ]
};

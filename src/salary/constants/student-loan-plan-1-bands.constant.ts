import { Dictionary } from 'lodash';

import { TaxBands } from '../interfaces/tax-band.interface';

export const studentLoanPlan1Bands: Dictionary<TaxBands> = {
  2020: [
    { min: 0, max: 19390, percentage: 0 },
    { min: 19390, max: Infinity, percentage: 0.09 }
  ]
};

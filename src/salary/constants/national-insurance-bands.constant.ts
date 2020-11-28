import { Dictionary } from 'lodash';

import { TaxBands } from '../interfaces/tax-band.interface';

export const nationalInsuranceBands: Dictionary<TaxBands> = {
  2020: [
    { min: 0, max: 9500, percentage: 0 },
    { min: 9500, max: 50000, percentage: 0.12 },
    { min: 50000, max: Infinity, percentage: 0.02 }
  ]
};

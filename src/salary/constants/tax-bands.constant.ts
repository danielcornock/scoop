import { Dictionary } from 'lodash';

import { TaxBand } from '../interfaces/tax-band.interface';

export const taxBands: Dictionary<Array<TaxBand>> = {
  2020: [
    { min: 0, max: 12500, percentage: 0 },
    { min: 12501, max: 50000, percentage: 0.2 },
    { min: 50001, max: 15000, percentage: 0.4 },
    { min: 150001, max: Infinity, percentage: 0.45 }
  ]
};

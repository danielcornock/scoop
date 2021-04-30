import { Dictionary } from 'lodash';

import { TaxBand } from '../interfaces/tax-band.interface';

export const taxBands: Dictionary<Array<TaxBand>> = {
  2020: [
    { min: 0, max: 12500, percentage: 0 },
    { min: 12500, max: 50000, percentage: 0.2 },
    { min: 50000, max: 150000, percentage: 0.4 },
    { min: 150000, max: Infinity, percentage: 0.45 }
  ],
  2021: [
    { min: 0, max: 12570, percentage: 0 },
    { min: 12500, max: 50270, percentage: 0.2 },
    { min: 50270, max: 150000, percentage: 0.4 },
    { min: 150000, max: Infinity, percentage: 0.45 }
  ]
};

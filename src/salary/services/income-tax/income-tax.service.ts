import { Injectable } from '@nestjs/common';
import { MathsService } from 'src/common/services/maths/maths.service';
import { TaxBand, TaxBands } from 'src/salary/interfaces/tax-band.interface';

import { TaxBandService } from '../tax-band/tax-band.service';

@Injectable()
export class IncomeTaxService {
  constructor(private readonly _taxBandService: TaxBandService) {}

  public getMonthlyIncomeTaxFromAnnualSalary(
    annualSalary: number,
    date: string
  ) {
    const taxBands: TaxBands = this._taxBandService.getTaxBands(date);
    const yearlyTax = this._getYearlyTax(annualSalary, taxBands);

    const monthlyTax = yearlyTax / 12;

    return MathsService.round(monthlyTax);
  }

  private _getYearlyTax(annualSalary, bands: TaxBands): number {
    return bands.reduce((accum: number, band: TaxBand) => {
      if (annualSalary < band.min) {
        return accum + 0;
      }

      const taxableSalaryInBand = Math.min(band.max, annualSalary) - band.min;

      const taxPaidInBand = taxableSalaryInBand * band.percentage;

      return accum + taxPaidInBand;
    }, 0);
  }
}

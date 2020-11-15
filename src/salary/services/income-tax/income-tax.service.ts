import { Injectable } from '@nestjs/common';
import { MathsService } from 'src/common/services/maths/maths.service';
import { TaxBand, TaxBands } from 'src/salary/interfaces/tax-band.interface';
import { Salary } from 'src/salary/schemas/salary.schema';

import { TaxBandService } from '../tax-band/tax-band.service';

@Injectable()
export class IncomeTaxService {
  constructor(private readonly _taxBandService: TaxBandService) {}

  public getMonthlyIncomeTaxFromAnnualSalary(
    annualSalary: number,
    date: string
  ) {
    const yearlyTax = this._getRawYearlyTax(annualSalary, date);

    const monthlyTax = yearlyTax / 12;

    return monthlyTax;
  }

  public getMonthlyIncomeTaxFromMonthlySalary(
    monthlySalary: number,
    date: string
  ): number {
    const annualSalary = MathsService.round1(monthlySalary * 12);

    return this.getMonthlyIncomeTaxFromAnnualSalary(annualSalary, date);
  }

  public getYearlyIncomeTaxFromYearlySalary(
    annualSalary: number,
    date: string
  ): number {
    const rawYearlyTax = this._getRawYearlyTax(annualSalary, date);

    return rawYearlyTax;
  }

  public getTotalTaxPaidInCollection(collection: Salary[]): number {
    return collection.reduce(
      (accum: number, entry: Salary) => accum + entry.incomeTax,
      0
    );
  }

  private _getRawYearlyTax(annualSalary: number, date: string): number {
    const taxBands: TaxBands = this._taxBandService.getTaxBands(date);

    return taxBands.reduce((accum: number, band: TaxBand) => {
      if (annualSalary <= band.min) {
        return accum + 0;
      }

      const taxableSalaryInBand = Math.min(band.max, annualSalary) - band.min;

      const taxPaidInBand = taxableSalaryInBand * band.percentage;

      return accum + taxPaidInBand;
    }, 0);
  }
}

import { Injectable } from '@nestjs/common';
import { nationalInsuranceBands } from 'src/salary/constants/national-insurance-bands.constant';
import { studentLoanPlan1Bands } from 'src/salary/constants/student-loan-plan-1-bands.constant';
import { studentLoanPlan2Bands } from 'src/salary/constants/student-loan-plan-2-bands.constant';
import { STUDENT_LOAN } from 'src/salary/constants/student-loan.enum';
import { taxBands } from 'src/salary/constants/tax-bands.constant';
import { TaxBand, TaxBands } from 'src/salary/interfaces/tax-band.interface';

@Injectable()
export class BandService {
  public getTaxBands(date: string, taxCode: string): TaxBands {
    const taxYearStart = this._getTaxYearStart(date);

    let bands: TaxBands = taxBands[taxYearStart];
    bands = this._processCustomTaxCode(bands, taxCode);

    return bands;
  }

  public getNationalInsuranceBands(date: string): TaxBands {
    const taxYearStart = this._getTaxYearStart(date);
    const bands: TaxBands = nationalInsuranceBands[taxYearStart];

    return bands;
  }

  public getStudentFinanceBands(date: string, plan: STUDENT_LOAN): TaxBands {
    const taxYearStart = this._getTaxYearStart(date);

    if (plan === STUDENT_LOAN.Pre2012) {
      return studentLoanPlan1Bands[taxYearStart];
    } else if (plan === STUDENT_LOAN.Post2012) {
      return studentLoanPlan2Bands[taxYearStart];
    } else {
      return null;
    }
  }

  public getYearlyPayment(
    annualSalary: number,
    taxBands: TaxBands | null
  ): number {
    if (!taxBands) {
      return 0;
    }

    return taxBands.reduce((accum: number, band: TaxBand) => {
      if (annualSalary <= band.min) {
        return accum + 0;
      }

      const taxableSalaryInBand = Math.min(band.max, annualSalary) - band.min;

      const taxPaidInBand = taxableSalaryInBand * band.percentage;

      return accum + taxPaidInBand;
    }, 0);
  }

  private _getTaxYearStart(date: string): number {
    const dateObj = new Date(date);
    let year = dateObj.getFullYear();
    const currentMonth = dateObj.getMonth() + 1;

    if (currentMonth < 4) {
      year--;
    }

    return year;
  }

  private _processCustomTaxCode(taxBands: TaxBands, taxCode: string): TaxBands {
    if (!taxCode) {
      return taxBands;
    }

    const taxFreeAllowance = parseInt(taxCode.slice(0, 4)) * 10;

    taxBands[0].max = taxFreeAllowance;
    taxBands[1].min = taxFreeAllowance;

    return taxBands;
  }
}

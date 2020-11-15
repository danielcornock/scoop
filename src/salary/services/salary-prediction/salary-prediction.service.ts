import { Injectable } from '@nestjs/common';
import { Dictionary } from 'lodash';
import { MathsService } from 'src/common/services/maths/maths.service';
import { nationalInsuranceFreeAllowances } from 'src/salary/constants/national-insurance-free-allowances.constant';
import { studentLoanPost2012Allowances } from 'src/salary/constants/student-loan-post-2012-allowances.constant';
import { studentLoanPre2012Allowances } from 'src/salary/constants/student-loan-pre-2012-allowances.constant';
import { STUDENT_LOAN } from 'src/salary/constants/student-loan.enum';
import { GrossSalaryPrediction } from 'src/salary/transfer-objects/gross-salary-prediction.dto';
import { SettingsService } from 'src/settings/services/settings/settings.service';

import { IncomeTaxService } from '../income-tax/income-tax.service';

@Injectable()
export class SalaryPredictionService {
  constructor(
    private readonly _settingsService: SettingsService,
    private readonly _incomeTaxService: IncomeTaxService
  ) {}

  public async getSalaryReductionPredictions(
    data: GrossSalaryPrediction,
    userId: string
  ): Promise<any> {
    const settings = await this._settingsService.getSettings(userId);

    const grossSalary = parseFloat(data.grossSalary);

    const yearlySalary = MathsService.round0(grossSalary * 12);

    const nationalInsurance = this._getNationalInsurance(
      yearlySalary,
      data.date
    );
    const studentLoanPayments = this._getStudentLoanPayments(
      yearlySalary,
      settings.salaryStudentFinance,
      data.date
    );
    const pensionContributions = this._getPensionContributions(
      yearlySalary,
      settings.salaryPensionContribution
    );

    const incomeTax = this._incomeTaxService.getMonthlyIncomeTaxFromAnnualSalary(
      yearlySalary,
      data.date
    );

    const netSalary = this.calculateNetSalary(grossSalary, [
      incomeTax,
      nationalInsurance,
      studentLoanPayments,
      pensionContributions
    ]);

    return {
      grossSalary,
      incomeTax,
      nationalInsurance,
      studentLoanPayments,
      pensionContributions,
      netSalary
    };
  }

  public calculateNetSalary(
    grossSalary: number,
    deductions: Array<number>
  ): number {
    return grossSalary - deductions.reduce((a, b) => a + b, 0);
  }

  private _getTaxYear(date: string): number {
    const dateObj = new Date(date);
    let currentYear = dateObj.getFullYear();
    const currentMonth = dateObj.getMonth() + 1;

    if (currentMonth < 4) {
      currentYear--;
    }

    return currentYear;
  }

  private _getNationalInsurance(yearlySalary: number, date: string): number {
    let yearlyNationalInsurance = 0;
    const freeAllowance = this._getAllowanceForYear(
      date,
      nationalInsuranceFreeAllowances
    );

    if (yearlySalary > 50000) {
      yearlyNationalInsurance += (yearlySalary - 50000) * 0.02;
      yearlyNationalInsurance += (50000 - freeAllowance) * 0.12;

      return this._twoDecimalPlaces(yearlyNationalInsurance / 12);
    } else {
      yearlyNationalInsurance += (yearlySalary - freeAllowance) * 0.12;

      return this._twoDecimalPlaces(yearlyNationalInsurance / 12);
    }
  }

  private _getAllowanceForYear(
    date: string,
    dictionary: Dictionary<number>
  ): number {
    const taxYear = this._getTaxYear(date);

    return dictionary[taxYear] || 0;
  }

  private _getStudentLoanPayments(
    yearlySalary: number,
    loanType: STUDENT_LOAN,
    date: string
  ): number {
    if (loanType === STUDENT_LOAN.Pre2012) {
      const allowance = this._getAllowanceForYear(
        date,
        studentLoanPre2012Allowances
      );
      const availableMonthlyIncome = (yearlySalary - allowance) / 12;

      return this._twoDecimalPlaces(availableMonthlyIncome * 0.09);
    } else if (loanType === STUDENT_LOAN.Post2012) {
      const allowance = this._getAllowanceForYear(
        date,
        studentLoanPost2012Allowances
      );
      const availableMonthlyincome = (yearlySalary - allowance) / 12;

      return this._twoDecimalPlaces(availableMonthlyincome * 0.09);
    } else {
      return 0;
    }
  }

  private _getPensionContributions(
    remainingSalary: number,
    rawPensionContribution: number
  ): number {
    const pensionContribution = rawPensionContribution / 100;

    return this._twoDecimalPlaces((remainingSalary * pensionContribution) / 12);
  }

  private _twoDecimalPlaces(value: number) {
    return Math.round(value * 100) / 100;
  }
}

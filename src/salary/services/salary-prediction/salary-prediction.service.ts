import { Injectable } from '@nestjs/common';
import { MathsService } from 'src/common/services/maths/maths.service';
import { STUDENT_LOAN } from 'src/salary/constants/student-loan.enum';
import { GrossSalaryPrediction } from 'src/salary/transfer-objects/gross-salary-prediction.dto';
import { SettingsService } from 'src/settings/services/settings/settings.service';

import { BandService } from '../band/band.service';
import { IncomeTaxService } from '../income-tax/income-tax.service';

@Injectable()
export class SalaryPredictionService {
  constructor(
    private readonly _settingsService: SettingsService,
    private readonly _incomeTaxService: IncomeTaxService,
    private readonly _bandService: BandService
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
    // This was 'fromYearlySalary' before - it seems to get it closer to the estimates given online but still around 0.02 off.
    const incomeTax = this._incomeTaxService.getMonthlyIncomeTaxFromMonthlySalary(
      MathsService.floor0(grossSalary),
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

  private _getNationalInsurance(yearlySalary: number, date: string): number {
    const yearlyNationalInsurance = this._bandService.getYearlyPayment(
      yearlySalary,
      this._bandService.getNationalInsuranceBands(date)
    );

    return MathsService.floor0(yearlyNationalInsurance / 12);
  }

  private _getStudentLoanPayments(
    yearlySalary: number,
    loanType: STUDENT_LOAN,
    date: string
  ): number {
    const yearlyStudentFinance = this._bandService.getYearlyPayment(
      yearlySalary,
      this._bandService.getStudentFinanceBands(date, loanType)
    );

    return MathsService.floor0(yearlyStudentFinance / 12);
  }

  private _getPensionContributions(
    remainingSalary: number,
    rawPensionContribution: number
  ): number {
    const pensionContribution = rawPensionContribution / 100;

    return MathsService.round2((remainingSalary * pensionContribution) / 12);
  }
}

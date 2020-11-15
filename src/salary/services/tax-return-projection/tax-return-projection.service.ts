import { Injectable } from '@nestjs/common';

import { IncomeTaxService } from '../income-tax/income-tax.service';
import {
  GetProjectedSalaryConfig,
  GetProjectedTaxReturnConfig,
  GetProjectedYearlyIncomeTaxConfig,
  GetRemainingTaxToBePaidConfig
} from './interfaces/tax-return-projection.interface';

@Injectable()
export class TaxReturnProjectionService {
  constructor(private readonly _incomeTaxService: IncomeTaxService) {}

  public getProjectedTaxReturn(config: GetProjectedTaxReturnConfig) {
    const remainingMonths = this._getRemainingMonthsInTaxYear(
      config.latestSalaryDate
    );

    const projectedRemainingTaxToPay = this._getRemainingTaxToBePaid({
      latestSalary: config.latestSalary,
      latestSalaryDate: config.latestSalaryDate,
      remainingMonths
    });

    const projectedYearlyIncomeTax = this._getProjectedYearlyIncomeTax({
      remainingMonths,
      latestSalary: config.latestSalary,
      latestSalaryDate: config.latestSalaryDate,
      totalEarnedSoFar: config.totalEarnedSoFar
    });

    const totalTaxPaidByEndOfYear =
      config.taxAlreadyPaid + projectedRemainingTaxToPay;

    const projectedTaxReturn =
      totalTaxPaidByEndOfYear - projectedYearlyIncomeTax;

    return projectedTaxReturn;
  }

  private _getRemainingMonthsInTaxYear(currentSalaryDate: string): number {
    const lastEnteredMonth = new Date(currentSalaryDate).getMonth() + 1;

    if (lastEnteredMonth >= 4) {
      return 15 - lastEnteredMonth;
    } else {
      return 3 - lastEnteredMonth;
    }
  }

  private _getProjectedYearlyIncomeTax(
    config: GetProjectedYearlyIncomeTaxConfig
  ): number {
    const projectedSalary = this._getProjectedSalary({
      remainingMonths: config.remainingMonths,
      latestSalary: config.latestSalary,
      totalEarnedSoFar: config.totalEarnedSoFar
    });

    return this._incomeTaxService.getYearlyIncomeTaxFromYearlySalary(
      projectedSalary,
      config.latestSalaryDate
    );
  }

  private _getRemainingTaxToBePaid(
    config: GetRemainingTaxToBePaidConfig
  ): number {
    return (
      this._incomeTaxService.getMonthlyIncomeTaxFromMonthlySalary(
        config.latestSalary,
        config.latestSalaryDate
      ) * config.remainingMonths
    );
  }

  private _getProjectedSalary(config: GetProjectedSalaryConfig): number {
    const projectedRemainingSalary =
      config.remainingMonths * config.latestSalary;

    return config.totalEarnedSoFar + projectedRemainingSalary;
  }
}

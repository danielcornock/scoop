import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseLogService } from 'src/common/abstracts/base-log.service';
import { DateInstance } from 'src/common/instances/date-instance';
import { DatabaseErrorsService } from 'src/common/services/database-errors/database-errors.service';
import { MathsService } from 'src/common/services/maths/maths.service';
import { Salary } from 'src/salary/schemas/salary.schema';
import { SalaryCreateRequest } from 'src/salary/transfer-objects/salary-create-request.dto';
import { SettingsService } from 'src/settings/services/settings/settings.service';

import { IncomeTaxService } from '../income-tax/income-tax.service';
import { SalaryPredictionService } from '../salary-prediction/salary-prediction.service';
import { TaxReturnProjectionService } from '../tax-return-projection/tax-return-projection.service';

@Injectable()
export class SalaryService extends BaseLogService<Salary> {
  constructor(
    @InjectModel(Salary.name)
    salaryRepo: Model<Salary>,
    private readonly _salaryPredictionService: SalaryPredictionService,
    private readonly _incomeTaxService: IncomeTaxService,
    private readonly _taxReturnProjectionService: TaxReturnProjectionService,
    private readonly _settingsService: SettingsService
  ) {
    super(salaryRepo);
  }

  public async createLogEntry(
    data: SalaryCreateRequest,
    user: string
  ): Promise<Salary> {
    await this._checkIfEntryForMonthExists(user, data.date);

    const netSalary = this._salaryPredictionService.calculateNetSalary(
      data.grossSalary,
      [
        data.incomeTax,
        data.nationalInsurance,
        data.studentFinance,
        data.pensionContributions,
        data.otherDeductions
      ]
    );

    try {
      const salary = await this._repo.create({
        date: data.date,
        grossSalary: data.grossSalary,
        incomeTax: data.incomeTax,
        nationalInsurance: data.nationalInsurance,
        studentFinance: data.studentFinance,
        otherDeductions: data.otherDeductions,
        pensionContributions: data.pensionContributions,
        netSalary,
        user
      });

      return salary;
    } catch (e) {
      DatabaseErrorsService.handle(e);
    }
  }

  public async getSalarySummaryItems(user: string): Promise<any> {
    const [currentYearEntries, { salaryTaxCode }] = await Promise.all([
      this._getItemsFromCurrentTaxYear(user),
      this._settingsService.getSettings(user)
    ]);

    if (!currentYearEntries.length) {
      return null;
    }

    const taxAlreadyPaid = this._incomeTaxService.getTotalTaxPaidInCollection(
      currentYearEntries
    );
    const grossSalaryThisYear = this._getTotalGrossSalaryFromCollection(
      currentYearEntries
    );
    const netSalaryThisYear = this._getTotalNetSalaryFromCollection(
      currentYearEntries
    );

    const projectedTaxReturn = await this._taxReturnProjectionService.getProjectedTaxReturn(
      {
        latestSalary: currentYearEntries[0].grossSalary,
        latestSalaryDate: currentYearEntries[0].date,
        taxAlreadyPaid,
        totalEarnedSoFar: grossSalaryThisYear,
        taxCode: salaryTaxCode
      }
    );

    const projectedGrossSalary = await this._calculatePredictedSalary(
      grossSalaryThisYear,
      currentYearEntries[0].date
    );

    const netSalaryOverGrossSalary = netSalaryThisYear / grossSalaryThisYear;
    const taxPercentage = taxAlreadyPaid / grossSalaryThisYear;

    return {
      taxPaid: MathsService.round2(taxAlreadyPaid),
      grossSalary: MathsService.round2(grossSalaryThisYear),
      projectedTaxReturn: MathsService.round10(projectedTaxReturn),
      netSalary: MathsService.round2(netSalaryThisYear),
      projectedGrossSalary: MathsService.round2(projectedGrossSalary),
      netSalaryOverGrossSalary: MathsService.round2(netSalaryOverGrossSalary),
      taxPercentage: MathsService.round2(taxPercentage)
    };
  }

  public async getLatestEntry(user: string): Promise<Salary> {
    const salary = await this._repo.find({ user }).sort({ date: 'desc' });

    return salary[0];
  }

  public extractLatestDeductions(data: Salary[]): Partial<Salary> {
    if (!data[0]) {
      return {};
    }

    return {
      incomeTax: data[0].incomeTax,
      nationalInsurance: data[0].nationalInsurance,
      studentFinance: data[0].studentFinance,
      pensionContributions: data[0].pensionContributions,
      otherDeductions: data[0].otherDeductions
    };
  }

  private _getTotalGrossSalaryFromCollection(collection: Salary[]): number {
    return collection.reduce(
      (accum: number, entry: Salary) => accum + entry.grossSalary,
      0
    );
  }

  private _getTotalNetSalaryFromCollection(collection: Salary[]): number {
    return collection.reduce(
      (accum: number, entry: Salary) => accum + entry.netSalary,
      0
    );
  }

  private async _getItemsFromCurrentTaxYear(user: string): Promise<Salary[]> {
    const currentDate = new Date(Date.now());
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const taxYear = currentMonth >= 4 ? currentYear : currentYear - 1;

    const data = await this._repo
      .find({
        user,
        date: { $gte: `${taxYear}-04`, $lte: `${taxYear + 1}-03` }
      })
      .sort({ date: 'desc' });

    return data;
  }

  private _calculatePredictedSalary(salarySoFar: number, date: string) {
    const currentMonth = new DateInstance(date).getRealMonth();

    const monthsPassed =
      currentMonth >= 4 ? currentMonth - 3 : currentMonth + 9;

    return (salarySoFar / monthsPassed) * 12;
  }
}

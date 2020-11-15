import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { forEach, isString } from 'lodash';
import { Model } from 'mongoose';
import { DatabaseErrorsService } from 'src/common/services/database-errors/database-errors.service';
import { MathsService } from 'src/common/services/maths/maths.service';
import { Salary } from 'src/salary/schemas/salary.schema';
import { SalaryCreateRequest } from 'src/salary/transfer-objects/salary-create-request.dto';

import { IncomeTaxService } from '../income-tax/income-tax.service';
import { SalaryPredictionService } from '../salary-prediction/salary-prediction.service';
import { TaxReturnProjectionService } from '../tax-return-projection/tax-return-projection.service';

@Injectable()
export class SalaryService {
  constructor(
    @InjectModel(Salary.name)
    private readonly _salaryRepo: Model<Salary>,
    private readonly _salaryPredictionService: SalaryPredictionService,
    private readonly _incomeTaxService: IncomeTaxService,
    private readonly _taxReturnProjectionService: TaxReturnProjectionService
  ) {}

  public async createLogEntry(
    data: SalaryCreateRequest,
    user: string
  ): Promise<Salary> {
    await this._checkIfEntryForMonthExists(user, data.date);

    const processedRequest = this._processAllValuesToNumber(data);
    const netSalary = this._salaryPredictionService.calculateNetSalary(
      processedRequest.grossSalary,
      [
        processedRequest.incomeTax,
        processedRequest.nationalInsurance,
        processedRequest.studentLoanPayments,
        processedRequest.pensionContributions
      ]
    );

    try {
      const salary = await this._salaryRepo.create({
        ...processedRequest,
        netSalary,
        user
      });

      return salary;
    } catch (e) {
      DatabaseErrorsService.handle(e);
    }
  }

  public async getAll(user: string): Promise<Salary[]> {
    const data = await this._salaryRepo.find({ user }).sort({ date: 'desc' });
    return data;
  }

  public async getSalaryMeta(user: string): Promise<any> {
    const currentYearEntries = await this._getItemsFromCurrentTaxYear(user);

    if (!currentYearEntries.length) {
      return null;
    }

    const taxAlreadyPaid = this._incomeTaxService.getTotalTaxPaidInCollection(
      currentYearEntries
    );
    const grossSalaryThisYear = this._getTotalGrossSalaryFromCollection(
      currentYearEntries
    );

    const projectedTaxReturn = this._taxReturnProjectionService.getProjectedTaxReturn(
      {
        latestSalary: currentYearEntries[0].grossSalary,
        latestSalaryDate: currentYearEntries[0].date,
        taxAlreadyPaid,
        totalEarnedSoFar: grossSalaryThisYear
      }
    );

    return {
      taxPaid: MathsService.round2(taxAlreadyPaid),
      totalEarned: MathsService.round2(grossSalaryThisYear),
      projectedTaxReturn: MathsService.round0(projectedTaxReturn)
    };
  }

  public async deleteOne(user: string, date: string): Promise<void> {
    await this._salaryRepo.deleteOne({ user, date });
  }

  private _getTotalGrossSalaryFromCollection(collection: Salary[]): number {
    return collection.reduce(
      (accum: number, entry: Salary) => accum + entry.grossSalary,
      0
    );
  }

  private async _getItemsFromCurrentTaxYear(user: string): Promise<Salary[]> {
    const currentDate = new Date(Date.now());
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const taxYear = currentMonth >= 4 ? currentYear : currentYear - 1;

    const data = await this._salaryRepo
      .find({
        user,
        date: { $gte: `${taxYear}-04`, $lte: `${taxYear + 1}-03` }
      })
      .sort({ date: 'desc' });

    return data;
  }

  private _processAllValuesToNumber(data: SalaryCreateRequest): Salary {
    const newObj = {} as Salary;

    forEach(data, (value: string | number, key: string) => {
      if (key === 'date') {
        newObj[key] = value as string;
      } else if (isString(value)) {
        newObj[key] = parseFloat(value);
      } else {
        newObj[key] = value || 0;
      }
    });

    return newObj;
  }

  private async _checkIfEntryForMonthExists(
    user: string,
    date: string
  ): Promise<void> {
    const foundEntry = await this._salaryRepo.findOne({
      user,
      date
    });

    if (foundEntry) {
      throw new BadRequestException(
        'An entry already exists for that month. Please remove your original entry if you wish to overwite it.'
      );
    }
  }
}

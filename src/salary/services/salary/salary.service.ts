import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { forEach, isString } from 'lodash';
import { Model } from 'mongoose';
import { DatabaseErrorsService } from 'src/common/services/database-errors/database-errors.service';
import { Salary } from 'src/salary/schemas/salary.schema';
import { SalaryCreateRequest } from 'src/salary/transfer-objects/salary-create-request.dto';

import { SalaryPredictionService } from '../salary-prediction/salary-prediction.service';

@Injectable()
export class SalaryService {
  constructor(
    @InjectModel(Salary.name)
    private readonly _salaryRepo: Model<Salary>,
    private readonly _salaryPredictionService: SalaryPredictionService
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

  public async deleteOne(user: string, date: string): Promise<void> {
    await this._salaryRepo.deleteOne({ user, date });
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

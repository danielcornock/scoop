import { IsNotEmpty, IsString } from 'class-validator';
import { emptyValidatorConfig } from 'src/common/constants/empty-validator-config.constant';

export class SalaryCreateRequest {
  @IsString()
  date: string;

  @IsNotEmpty(emptyValidatorConfig)
  grossSalary: number | string;

  @IsNotEmpty(emptyValidatorConfig)
  incomeTax: number | string;

  @IsNotEmpty(emptyValidatorConfig)
  nationalInsurance: number | string;

  studentFinance: number | string;

  pensionContributions: number | string;

  otherDeductions: number | string;
}

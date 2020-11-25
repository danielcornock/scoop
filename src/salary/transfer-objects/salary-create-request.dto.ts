import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { emptyValidatorConfig } from 'src/common/constants/empty-validator-config.constant';

export class SalaryCreateRequest {
  @IsString()
  date: string;

  @IsNotEmpty(emptyValidatorConfig)
  @IsNumber()
  grossSalary: number;

  @IsNumber()
  incomeTax: number;

  @IsNumber()
  nationalInsurance: number;

  @IsNumber()
  studentFinance: number;

  @IsNumber()
  pensionContributions: number;

  @IsNumber()
  otherDeductions: number;
}

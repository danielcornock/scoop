import { IsNotEmpty, IsString } from 'class-validator';

export class SalaryCreateRequest {
  @IsString()
  date: string;

  @IsNotEmpty()
  grossSalary: number | string;

  @IsNotEmpty()
  incomeTax: number | string;

  @IsNotEmpty()
  nationalInsurance: number | string;

  @IsNotEmpty()
  studentFinance: number | string;

  @IsNotEmpty()
  pensionContributions: number | string;

  @IsNotEmpty()
  otherDeductions: number | string;
}

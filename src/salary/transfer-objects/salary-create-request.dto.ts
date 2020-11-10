import { IsNotEmpty, IsString } from 'class-validator';

export class SalaryCreateRequest {
  @IsString()
  date: string;

  @IsNotEmpty()
  grossSalary: number | string;

  @IsNotEmpty()
  incomeTax: number | string;
  nationalInsurance: number | string;
  studentLoans: number | string;
  pensionContribution: number | string;
  netSalary: number | string;
}

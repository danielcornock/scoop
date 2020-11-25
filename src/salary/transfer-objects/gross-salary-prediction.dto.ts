import { IsNumber, IsString } from 'class-validator';

export class GrossSalaryPrediction {
  @IsString()
  date: string;

  @IsNumber()
  grossSalary: number;
}

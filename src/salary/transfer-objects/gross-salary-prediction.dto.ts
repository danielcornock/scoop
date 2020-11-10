import { IsNumberString, IsString } from 'class-validator';

export class GrossSalaryPrediction {
  @IsString()
  date: string;

  @IsNumberString()
  grossSalary: string;
}

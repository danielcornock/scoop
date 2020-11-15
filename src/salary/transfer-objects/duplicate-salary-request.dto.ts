import { IsString } from 'class-validator';

export class DuplicateSalaryRequest {
  @IsString()
  date: string;
}

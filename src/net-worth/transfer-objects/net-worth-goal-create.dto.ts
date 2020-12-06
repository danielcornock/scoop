import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateNetWorthGoalRequest {
  @IsArray()
  @IsNotEmpty()
  fields: Array<string>;

  @IsNumber()
  target: number;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  endDate: string;

  @IsString()
  goalType: '0' | 'now';

  @IsOptional()
  @IsString()
  startDate: string;
}

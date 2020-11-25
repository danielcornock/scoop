import { IsNumber, IsString } from 'class-validator';

export class InvestmentCreate {
  @IsString()
  date: string;

  @IsNumber()
  addedSinceLast: number;

  @IsNumber()
  totalValue: number;
}

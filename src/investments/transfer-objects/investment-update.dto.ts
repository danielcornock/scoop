import { IsNumber } from 'class-validator';

export class InvestmentUpdate {
  @IsNumber()
  addedSinceLast: number;

  @IsNumber()
  totalValue: number;
}

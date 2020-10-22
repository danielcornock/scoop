import { IsDate, IsNumberString } from 'class-validator';

export class InvestmentCreate {
  @IsDate()
  date: string;

  @IsNumberString()
  totalInvested: number;

  @IsNumberString()
  totalValue: number;
}

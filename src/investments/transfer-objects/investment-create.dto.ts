import { IsNumberString, IsString } from 'class-validator';

export class InvestmentCreate {
  @IsString()
  date: string;

  @IsNumberString()
  totalInvested: number;

  @IsNumberString()
  totalValue: number;
}

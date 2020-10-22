import { IsNumberString, IsString } from 'class-validator';

export class InvestmentCreate {
  @IsString()
  date: string;

  @IsNumberString()
  addedSinceLast: string;

  @IsNumberString()
  totalValue: string;
}

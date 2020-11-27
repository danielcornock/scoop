import { IsBoolean, IsNumber, IsString, Max, Min } from 'class-validator';

export class UpdateUserSettingsRequest {
  @IsBoolean()
  enableInvestments: boolean;

  @IsBoolean()
  enableNetWorth: boolean;

  @IsBoolean()
  enableMonthlyDistribution: boolean;

  @IsString()
  preferredCurrency: string;

  @IsBoolean()
  enableEmailNotifications: boolean;

  @IsBoolean()
  enableEmailNewsletters: boolean;

  @IsNumber()
  @Min(1)
  @Max(31)
  reminderDate: number;
}

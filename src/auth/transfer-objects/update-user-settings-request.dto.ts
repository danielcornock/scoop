import { IsBoolean, IsString } from 'class-validator';

export class UpdateUserSettingsRequest {
  @IsBoolean()
  enableInvestments: string;

  @IsBoolean()
  enableNetWorth: string;

  @IsBoolean()
  enableMonthlyDistribution: string;

  @IsString()
  preferredCurrency: string;

  @IsBoolean()
  enableEmailNotifications: boolean;

  @IsString()
  reminderDate: string;
}

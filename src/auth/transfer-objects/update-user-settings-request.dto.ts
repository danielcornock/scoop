import { IsBoolean, IsString } from 'class-validator';

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

  @IsString()
  reminderDate: string;
}

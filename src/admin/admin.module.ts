import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { InvestmentsModule } from 'src/investments/investments.module';
import { MonthlyDistributionModule } from 'src/monthly-distribution/monthly-distribution.module';
import { NetWorthModule } from 'src/net-worth/net-worth.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { SettingsModule } from 'src/settings/settings.module';

import { AdminController } from './controllers/admin/admin.controller';

@Module({
  imports: [
    AuthModule,
    NotificationsModule,
    NetWorthModule,
    InvestmentsModule,
    MonthlyDistributionModule,
    SettingsModule
  ],
  controllers: [AdminController]
})
export class AdminModule {}

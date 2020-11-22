import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { databaseUriFactory } from './config/database/database-uri.factory';
import { InvestmentsModule } from './investments/investments.module';
import { MonthlyDistributionModule } from './monthly-distribution/monthly-distribution.module';
import { NetWorthModule } from './net-worth/net-worth.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SalaryModule } from './salary/salary.module';
import { SettingsModule } from './settings/settings.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRootAsync({
      useFactory: databaseUriFactory
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client')
    }),
    SettingsModule,
    NetWorthModule,
    InvestmentsModule,
    MonthlyDistributionModule,
    NotificationsModule,
    CommonModule,
    AdminModule,
    TasksModule,
    SalaryModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}

import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { databaseUriString, devDatabaseUriString, isDevelopment } from './config/misc/env';
import { InvestmentsModule } from './investments/investments.module';
import { MonthlyDistributionModule } from './monthly-distribution/monthly-distribution.module';
import { NetWorthModule } from './net-worth/net-worth.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRootAsync({
      useFactory: () => {
        if (isDevelopment) {
          Logger.log('Connecting to DEVELOPMENT database', 'DatabaseFactory');
          return {
            uri: devDatabaseUriString
          };
        } else {
          Logger.log('Connecting to PRODUCTION database', 'DatabaseFactory');
          return {
            uri: databaseUriString
          };
        }
      }
    }),
    SettingsModule,
    NetWorthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client')
    }),
    InvestmentsModule,
    MonthlyDistributionModule,
    NotificationsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}

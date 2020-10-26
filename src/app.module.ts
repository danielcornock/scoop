import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { databaseUriString } from './config/misc/env';
import { NetWorthModule } from './net-worth/net-worth.module';
import { SettingsModule } from './settings/settings.module';
import { InvestmentsModule } from './investments/investments.module';
import { MonthlyDistributionModule } from './monthly-distribution/monthly-distribution.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(databaseUriString),
    SettingsModule,
    NetWorthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client')
    }),
    InvestmentsModule,
    MonthlyDistributionModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}

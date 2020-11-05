import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { SettingsModule } from 'src/settings/settings.module';

import { MonthlyDistributionController } from './controllers/monthly-distribution/monthly-distribution.controller';
import { MonthlyDistribution, MonthlyDistributionSchema } from './schemas/monthly-distribution.schema';
import { MonthlyDistributionService } from './services/monthly-distribution/monthly-distribution.service';

@Module({
  imports: [
    AuthModule,
    SettingsModule,
    MongooseModule.forFeature([
      { name: MonthlyDistribution.name, schema: MonthlyDistributionSchema }
    ])
  ],
  controllers: [MonthlyDistributionController],
  providers: [MonthlyDistributionService],
  exports: [MonthlyDistributionService]
})
export class MonthlyDistributionModule {}

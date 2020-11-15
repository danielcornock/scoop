import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { SettingsModule } from 'src/settings/settings.module';

import { SalaryController } from './controllers/salary/salary.controller';
import { Salary, SalarySchema } from './schemas/salary.schema';
import { SalaryService } from './services/salary/salary.service';
import { SalaryPredictionService } from './services/salary-prediction/salary-prediction.service';
import { IncomeTaxService } from './services/income-tax/income-tax.service';
import { TaxBandService } from './services/tax-band/tax-band.service';

@Module({
  imports: [
    AuthModule,
    SettingsModule,
    MongooseModule.forFeature([{ name: Salary.name, schema: SalarySchema }])
  ],
  controllers: [SalaryController],
  providers: [SalaryService, SalaryPredictionService, IncomeTaxService, TaxBandService]
})
export class SalaryModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { SettingsModule } from 'src/settings/settings.module';

import { SalaryController } from './controllers/salary/salary.controller';
import { Salary, SalarySchema } from './schemas/salary.schema';
import { IncomeTaxService } from './services/income-tax/income-tax.service';
import { SalaryPredictionService } from './services/salary-prediction/salary-prediction.service';
import { SalaryService } from './services/salary/salary.service';
import { BandService } from './services/band/band.service';
import { TaxReturnProjectionService } from './services/tax-return-projection/tax-return-projection.service';

@Module({
  imports: [
    AuthModule,
    SettingsModule,
    MongooseModule.forFeature([{ name: Salary.name, schema: SalarySchema }])
  ],
  controllers: [SalaryController],
  providers: [
    SalaryService,
    SalaryPredictionService,
    IncomeTaxService,
    BandService,
    TaxReturnProjectionService
  ]
})
export class SalaryModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { SettingsModule } from 'src/settings/settings.module';

import { NetWorthGoalsController } from './controllers/net-worth-goals/net-worth-goals.controller';
import { NetWorthController } from './controllers/net-worth/net-worth.controller';
import {
  NetWorthGoal,
  NetWorthGoalsSchema
} from './schemas/net-worth-goals.schema';
import { NetWorth, NetWorthSchema } from './schemas/net-worth.schema';
import { NetWorthGoalsService } from './services/net-worth-goals/net-worth-goals.service';
import { NetWorthProjectionService } from './services/net-worth-projection/net-worth-projection.service';
import { NetWorthService } from './services/net-worth/net-worth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NetWorth.name, schema: NetWorthSchema },
      { name: NetWorthGoal.name, schema: NetWorthGoalsSchema }
    ]),
    SettingsModule,
    AuthModule
  ],
  controllers: [NetWorthController, NetWorthGoalsController],
  providers: [NetWorthService, NetWorthGoalsService, NetWorthProjectionService],
  exports: [NetWorthService]
})
export class NetWorthModule {}

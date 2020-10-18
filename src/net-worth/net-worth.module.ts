import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { SettingsModule } from 'src/settings/settings.module';

import { NetWorthController } from './controllers/net-worth/net-worth.controller';
import { NetWorth, NetWorthSchema } from './schemas/net-worth.schema';
import { NetWorthService } from './services/net-worth/net-worth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NetWorth.name, schema: NetWorthSchema }
    ]),
    SettingsModule,
    AuthModule
  ],
  controllers: [NetWorthController],
  providers: [NetWorthService]
})
export class NetWorthModule {}

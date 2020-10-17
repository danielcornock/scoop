import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

import { SettingsController } from './controllers/settings/settings.controller';
import { Settings, SettingsSchema } from './schemas/settings.schema';
import { SettingsService } from './services/settings/settings.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: Settings.name, schema: SettingsSchema }])
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
  exports: [SettingsService]
})
export class SettingsModule {}

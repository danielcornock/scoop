import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SettingsModule } from 'src/settings/settings.module';

import { AuthController } from './controllers/auth/auth.controller';
import { User, UserSchema } from './schemas/user.schema';
import { AuthService } from './services/auth/auth.service';

@Module({
  imports: [
    SettingsModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}

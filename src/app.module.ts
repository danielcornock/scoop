import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { databaseUriString } from './config/misc/env';

@Module({
  imports: [AuthModule, MongooseModule.forRoot(databaseUriString)],
  controllers: [],
  providers: [],
})
export class AppModule {}

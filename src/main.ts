import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { port } from './config/misc/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port || 3000);
  Logger.log(`Server is running on port ${port || 3000}`, 'NestApplication');
}
bootstrap();

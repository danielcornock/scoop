import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as morgan from 'morgan';

import { AppModule } from './app.module';
import { environment, port } from './config/misc/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ValidationPipe());

  if (environment !== 'production') {
    app.use(morgan('dev'));
  }
  await app.listen(port || 3000);
  Logger.log(`Server is running on port ${port || 3000}`, 'NestApplication');
}
bootstrap();

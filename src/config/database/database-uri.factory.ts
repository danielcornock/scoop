import { Logger } from '@nestjs/common';
import { MongooseModuleOptions } from '@nestjs/mongoose';

import {
  databaseUriString,
  devDatabaseUriString,
  isDevelopment,
  isProduction,
  localDatabaseUriString
} from '../misc/env';

export function databaseUriFactory(): MongooseModuleOptions {
  if (isDevelopment) {
    Logger.log('Connecting to DEVELOPMENT database', 'DatabaseFactory');
    return {
      uri: devDatabaseUriString
    };
  } else if (isProduction) {
    Logger.log('Connecting to PRODUCTION database', 'DatabaseFactory');
    return {
      uri: databaseUriString
    };
  } else {
    Logger.log('Connecting to LOCAL databasse', 'DatabaseFactory');

    return {
      uri: localDatabaseUriString
    };
  }
}

import { Logger } from '@nestjs/common';
import { MongooseModuleOptions } from '@nestjs/mongoose';

import {
  databaseUriString,
  devDatabaseUriString,
  isDevelopment,
  isLocal,
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
  } else if (isLocal) {
    Logger.log('Connecting to LOCAL databasse', 'DatabaseFactory');

    return {
      uri: localDatabaseUriString
    };
  } else {
    throw new Error('Invalid environment set. Unable to connect to database.');
  }
}

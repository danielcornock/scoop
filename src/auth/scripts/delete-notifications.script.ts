import { Logger } from '@nestjs/common';
import { Db } from 'mongodb';

import { runDatabaseScript } from './run-database-script';

runDatabaseScript(async (db: Db) => {
  await db.collection('notifications').deleteMany({});

  Logger.log(`All notifications removed`, 'DatabaseOperation');
});

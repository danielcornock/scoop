import { Logger } from '@nestjs/common';
import { Db } from 'mongodb';

import { runDatabaseScript } from './run-database-script';

runDatabaseScript(async (db: Db) => {
  await db
    .collection('usersettings')
    .updateMany({}, { $set: { enableEmailNewsletters: true } });

  Logger.log(
    `All users reminder date has been set to integer 1`,
    'DatabaseOperation'
  );
});

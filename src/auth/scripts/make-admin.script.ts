import { Logger } from '@nestjs/common';
import { Db } from 'mongodb';

import { runDatabaseScript } from './run-database-script';

runDatabaseScript(async (db: Db) => {
  const email: string = process.argv[2];

  await db
    .collection('users')
    .updateOne({ email }, { $set: { isAdmin: true } });

  Logger.log(
    `User with email address ${email} has been made admin.`,
    'DatabaseOperation'
  );
});

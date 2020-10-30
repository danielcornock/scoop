import { Db, MongoClient } from 'mongodb';
import { databaseUriFactory } from 'src/config/database/database-uri.factory';

export async function runDatabaseScript(
  callback: (db: Db) => Promise<void>
): Promise<void> {
  const client = await MongoClient.connect(databaseUriFactory().uri, {
    useUnifiedTopology: true
  });

  const db = await client.db();

  await callback(db);

  process.exit(1);
}

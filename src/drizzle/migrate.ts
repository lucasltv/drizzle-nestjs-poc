import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { Client } from 'pg';

const main = async () => {
  const connection = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  try {
    await connection.connect();
    const db = drizzle(connection);

    await migrate(db, {
      migrationsFolder: 'src/drizzle/migrations',
    });

    console.log('Migration successful');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
  await connection.end();
};

main();

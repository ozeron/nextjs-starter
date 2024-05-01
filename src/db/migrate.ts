import { config } from "dotenv";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { db, sql } from './schema';

config({ path: ".env.local" });

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: './src/db/migrations' });
    console.log("Migration completed");
  } catch (error) {
    console.error("Error during migration:", error);
    process.exit(1);
  }
};

main()
  .catch((reason: unknown) => { console.error(reason) });

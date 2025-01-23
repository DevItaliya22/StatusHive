import { drizzle } from 'drizzle-orm/neon-http';
import { env } from '@/lib/env';

if (!env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

const createDrizzleInstance = () => {
    console.log("Db intialized");
    return drizzle(env.DATABASE_URL!,{
      logger:true
    })
};

declare global {
  var _db: ReturnType<typeof drizzle> | undefined;
}

const db = global._db ?? createDrizzleInstance();

if (process.env.NODE_ENV !== 'production') {
  global._db = db;
}

export default db;
/* eslint-disable no-var */

import { drizzle } from 'drizzle-orm/neon-http';
import { env } from '@/lib/env';

if (!env.DATABASE_URL || env.DATABASE_URL.trim() === '') {
  throw new Error('DATABASE_URL is not set');
}

const createDrizzleInstance = () => {
  console.log("Db initialized");
  return drizzle(env.DATABASE_URL, { logger: true });
};


declare global {
  var _db: ReturnType<typeof drizzle> | undefined;
}

if (typeof global._db === 'undefined') {
  global._db = createDrizzleInstance();
}

const db = global._db;

export default db;

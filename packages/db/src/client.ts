import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema/index.js';

export function createDbClient(connectionString?: string) {
  const url = connectionString || process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/stack_dev';
  const client = postgres(url, { prepare: false });
  return drizzle(client, { schema });
}

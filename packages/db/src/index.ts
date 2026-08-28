import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema/index.js';

export * from './schema/index.js';
export { schema };

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/stack_dev';
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });

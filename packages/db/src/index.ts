import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as users from './schema/users';
import * as auth from './schema/auth';

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/stack_dev';

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { prepare: false });

export const schema = { ...users, ...auth };
export const db = drizzle(client, { schema });

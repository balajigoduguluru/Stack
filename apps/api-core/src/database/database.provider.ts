import { Provider } from '@nestjs/common';
import { db } from '@stack/db';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

export const databaseProviders: Provider[] = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: () => {
      return db;
    },
  },
];

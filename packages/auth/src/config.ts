import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@stack/db';
import type { DefaultSession, NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

export const authConfig = {
  adapter: DrizzleAdapter(db),
  providers: [
    GitHub,
    Google
  ],
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
} satisfies NextAuthConfig;

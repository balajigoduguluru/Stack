import { pgTable, uuid, text, timestamp, integer, boolean, index } from 'drizzle-orm/pg-core';
import { users } from './users.js';

export const subscriptions = pgTable(
  'subscriptions',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .references(() => users.id, { onDelete: 'set null' })
      .unique(),
    stripeCustomerId: text('stripe_customer_id').unique(),
    stripeSubscriptionId: text('stripe_subscription_id').unique(),
    stripePriceId: text('stripe_price_id'),
    status: text('status').notNull().default('active'),
    tier: text('tier').notNull().default('free'),
    aiCreditsUsed: integer('ai_credits_used').notNull().default(0),
    aiCreditsLimit: integer('ai_credits_limit').notNull().default(100),
    currentPeriodStart: timestamp('current_period_start', { mode: 'date', withTimezone: true }),
    currentPeriodEnd: timestamp('current_period_end', { mode: 'date', withTimezone: true }),
    cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false).notNull(),
    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('subscriptions_user_id_idx').on(table.userId),
    statusIdx: index('subscriptions_status_idx').on(table.status),
    stripeCustIdx: index('subscriptions_stripe_cust_idx').on(table.stripeCustomerId),
  })
);

export const subscriptionPeriods = pgTable(
  'subscription_periods',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    subscriptionId: uuid('subscription_id')
      .references(() => subscriptions.id, { onDelete: 'cascade' })
      .notNull(),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
    periodStart: timestamp('period_start', { mode: 'date', withTimezone: true }).notNull(),
    periodEnd: timestamp('period_end', { mode: 'date', withTimezone: true }).notNull(),
    creditsAllocated: integer('credits_allocated').notNull().default(100),
    creditsConsumed: integer('credits_consumed').notNull().default(0),
    status: text('status').notNull().default('active'),
    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    subIdIdx: index('sub_periods_sub_id_idx').on(table.subscriptionId),
    userIdIdx: index('sub_periods_user_id_idx').on(table.userId),
    dateRangeIdx: index('sub_periods_range_idx').on(table.periodStart, table.periodEnd),
  })
);

export type Subscription = typeof subscriptions.$inferSelect;
export type NewSubscription = typeof subscriptions.$inferInsert;
export type SubscriptionPeriod = typeof subscriptionPeriods.$inferSelect;
export type NewSubscriptionPeriod = typeof subscriptionPeriods.$inferInsert;

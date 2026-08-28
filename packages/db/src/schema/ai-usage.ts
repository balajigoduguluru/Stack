import { pgTable, uuid, text, timestamp, integer, real, jsonb, index } from 'drizzle-orm/pg-core';
import { users } from './users.js';
import { subscriptions, subscriptionPeriods } from './subscriptions.js';

export const aiUsageLogs = pgTable(
  'ai_usage_logs',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
    subscriptionId: uuid('subscription_id').references(() => subscriptions.id, { onDelete: 'set null' }),
    subscriptionPeriodId: uuid('subscription_period_id').references(() => subscriptionPeriods.id, { onDelete: 'set null' }),
    requestId: text('request_id').notNull(),
    model: text('model').notNull(),
    provider: text('provider').notNull(),
    promptMode: text('prompt_mode'),
    inputTokens: integer('input_tokens').notNull().default(0),
    outputTokens: integer('output_tokens').notNull().default(0),
    totalTokens: integer('total_tokens').notNull().default(0),
    creditsConsumed: integer('credits_consumed').notNull().default(1),
    estimatedCostUsd: real('estimated_cost_usd').notNull().default(0),
    metadata: jsonb('metadata').default({}).notNull(),
    timestamp: timestamp('timestamp', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('ai_usage_user_id_idx').on(table.userId),
    requestIdIdx: index('ai_usage_request_id_idx').on(table.requestId),
    subPeriodIdx: index('ai_usage_sub_period_idx').on(table.subscriptionPeriodId),
    timestampIdx: index('ai_usage_timestamp_idx').on(table.timestamp),
  })
);

export type AiUsageLog = typeof aiUsageLogs.$inferSelect;
export type NewAiUsageLog = typeof aiUsageLogs.$inferInsert;

import { pgTable, uuid, text, timestamp, integer, index } from 'drizzle-orm/pg-core';
import { users } from './users.js';
import { courses } from './courses.js';
import { documents } from './documents.js';
import { flashcardDecks } from './flashcards.js';
import { aiUsageLogs } from './ai-usage.js';

export const studySessions = pgTable(
  'study_sessions',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    courseId: uuid('course_id').references(() => courses.id, { onDelete: 'set null' }),
    documentId: uuid('document_id').references(() => documents.id, { onDelete: 'set null' }),
    deckId: uuid('deck_id').references(() => flashcardDecks.id, { onDelete: 'set null' }),
    aiUsageLogId: uuid('ai_usage_log_id').references(() => aiUsageLogs.id, { onDelete: 'set null' }),
    startTime: timestamp('start_time', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
    endTime: timestamp('end_time', { mode: 'date', withTimezone: true }),
    durationSeconds: integer('duration_seconds').notNull().default(0),
    studyType: text('study_type').notNull().default('reading'), // 'notes' | 'flashcards' | 'pomodoro' | 'reading' | 'ai_chat'
    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('study_sessions_user_id_idx').on(table.userId),
    courseIdIdx: index('study_sessions_course_id_idx').on(table.courseId),
    startTimeIdx: index('study_sessions_start_time_idx').on(table.startTime),
  })
);

export type StudySession = typeof studySessions.$inferSelect;
export type NewStudySession = typeof studySessions.$inferInsert;

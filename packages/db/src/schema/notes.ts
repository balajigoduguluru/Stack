import { pgTable, uuid, text, timestamp, boolean, index } from 'drizzle-orm/pg-core';
import { users } from './users.js';
import { courses } from './courses.js';
import { documents } from './documents.js';

export const notes = pgTable(
  'notes',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    courseId: uuid('course_id').references(() => courses.id, { onDelete: 'set null' }),
    documentId: uuid('document_id').references(() => documents.id, { onDelete: 'set null' }),
    title: text('title').notNull(),
    content: text('content').notNull(),
    summary: text('summary'),
    isFavorite: boolean('is_favorite').default(false).notNull(),
    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('notes_user_id_idx').on(table.userId),
    courseIdIdx: index('notes_course_id_idx').on(table.courseId),
    docIdIdx: index('notes_document_id_idx').on(table.documentId),
    createdAtIdx: index('notes_created_at_idx').on(table.createdAt),
    updatedAtIdx: index('notes_updated_at_idx').on(table.updatedAt),
  })
);

export type Note = typeof notes.$inferSelect;
export type NewNote = typeof notes.$inferInsert;

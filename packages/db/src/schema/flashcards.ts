import { pgTable, uuid, text, timestamp, integer, real, index } from 'drizzle-orm/pg-core';
import { users } from './users.js';
import { courses } from './courses.js';
import { documents } from './documents.js';
import { notes } from './notes.js';

export const flashcardDecks = pgTable(
  'flashcard_decks',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    courseId: uuid('course_id').references(() => courses.id, { onDelete: 'set null' }),
    documentId: uuid('document_id').references(() => documents.id, { onDelete: 'set null' }),
    noteId: uuid('note_id').references(() => notes.id, { onDelete: 'set null' }),
    name: text('name').notNull(),
    description: text('description'),
    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('decks_user_id_idx').on(table.userId),
    courseIdIdx: index('decks_course_id_idx').on(table.courseId),
  })
);

export const flashcards = pgTable(
  'flashcards',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    deckId: uuid('deck_id')
      .references(() => flashcardDecks.id, { onDelete: 'cascade' })
      .notNull(),
    userId: uuid('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    documentId: uuid('document_id').references(() => documents.id, { onDelete: 'set null' }),
    noteId: uuid('note_id').references(() => notes.id, { onDelete: 'set null' }),
    deckName: text('deck_name').notNull().default('General'),
    front: text('front').notNull(),
    back: text('back').notNull(),
    masteryLevel: integer('mastery_level').notNull().default(0),
    nextReviewAt: timestamp('next_review_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    deckIdIdx: index('flashcards_deck_id_idx').on(table.deckId),
    userIdIdx: index('flashcards_user_id_idx').on(table.userId),
    nextReviewIdx: index('flashcards_next_review_idx').on(table.nextReviewAt),
  })
);

export const flashcardReviewEvents = pgTable(
  'flashcard_review_events',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    flashcardId: uuid('flashcard_id')
      .references(() => flashcards.id, { onDelete: 'cascade' })
      .notNull(),
    userId: uuid('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    rating: integer('rating').notNull(), // 1: Again, 2: Hard, 3: Good, 4: Easy
    reviewedAt: timestamp('reviewed_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
    repetitions: integer('repetitions').notNull().default(1),
    intervalDays: integer('interval_days').notNull().default(1),
    easeFactor: real('ease_factor').notNull().default(2.5),
    stability: real('stability').notNull().default(1.0),
    difficulty: real('difficulty').notNull().default(5.0),
    nextReviewAt: timestamp('next_review_at', { mode: 'date', withTimezone: true }).notNull(),
  },
  (table) => ({
    flashcardIdIdx: index('review_events_card_id_idx').on(table.flashcardId),
    userIdIdx: index('review_events_user_id_idx').on(table.userId),
    nextReviewIdx: index('review_events_next_review_idx').on(table.nextReviewAt),
  })
);

export type FlashcardDeck = typeof flashcardDecks.$inferSelect;
export type NewFlashcardDeck = typeof flashcardDecks.$inferInsert;
export type Flashcard = typeof flashcards.$inferSelect;
export type NewFlashcard = typeof flashcards.$inferInsert;
export type FlashcardReviewEvent = typeof flashcardReviewEvents.$inferSelect;
export type NewFlashcardReviewEvent = typeof flashcardReviewEvents.$inferInsert;

import { relations } from 'drizzle-orm';
import { users, userProfiles } from './schema/users.js';
import { subscriptions, subscriptionPeriods } from './schema/subscriptions.js';
import { aiUsageLogs } from './schema/ai-usage.js';
import { documents, documentPages, documentChunks } from './schema/documents.js';
import { courses, courseModules, courseLessons } from './schema/courses.js';
import { notes } from './schema/notes.js';
import { flashcardDecks, flashcards, flashcardReviewEvents } from './schema/flashcards.js';
import { tasks } from './schema/tasks.js';
import { studySessions } from './schema/study-sessions.js';

export const userRelations = relations(users, ({ one, many }) => ({
  profile: one(userProfiles, {
    fields: [users.id],
    references: [userProfiles.userId],
  }),
  subscriptions: many(subscriptions),
  subscriptionPeriods: many(subscriptionPeriods),
  aiUsageLogs: many(aiUsageLogs),
  documents: many(documents),
  courses: many(courses),
  notes: many(notes),
  flashcardDecks: many(flashcardDecks),
  flashcards: many(flashcards),
  reviewEvents: many(flashcardReviewEvents),
  tasks: many(tasks),
  studySessions: many(studySessions),
}));

export const userProfileRelations = relations(userProfiles, ({ one }) => ({
  user: one(users, {
    fields: [userProfiles.userId],
    references: [users.id],
  }),
}));

export const subscriptionRelations = relations(subscriptions, ({ one, many }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
  periods: many(subscriptionPeriods),
  aiUsageLogs: many(aiUsageLogs),
}));

export const subscriptionPeriodRelations = relations(subscriptionPeriods, ({ one, many }) => ({
  subscription: one(subscriptions, {
    fields: [subscriptionPeriods.subscriptionId],
    references: [subscriptions.id],
  }),
  user: one(users, {
    fields: [subscriptionPeriods.userId],
    references: [users.id],
  }),
  aiUsageLogs: many(aiUsageLogs),
}));

export const aiUsageLogRelations = relations(aiUsageLogs, ({ one, many }) => ({
  user: one(users, {
    fields: [aiUsageLogs.userId],
    references: [users.id],
  }),
  subscription: one(subscriptions, {
    fields: [aiUsageLogs.subscriptionId],
    references: [subscriptions.id],
  }),
  subscriptionPeriod: one(subscriptionPeriods, {
    fields: [aiUsageLogs.subscriptionPeriodId],
    references: [subscriptionPeriods.id],
  }),
  studySessions: many(studySessions),
}));

export const documentRelations = relations(documents, ({ one, many }) => ({
  user: one(users, {
    fields: [documents.userId],
    references: [users.id],
  }),
  pages: many(documentPages),
  chunks: many(documentChunks),
  notes: many(notes),
  flashcardDecks: many(flashcardDecks),
  studySessions: many(studySessions),
}));

export const documentPageRelations = relations(documentPages, ({ one, many }) => ({
  document: one(documents, {
    fields: [documentPages.documentId],
    references: [documents.id],
  }),
  chunks: many(documentChunks),
}));

export const documentChunkRelations = relations(documentChunks, ({ one }) => ({
  document: one(documents, {
    fields: [documentChunks.documentId],
    references: [documents.id],
  }),
  page: one(documentPages, {
    fields: [documentChunks.pageId],
    references: [documentPages.id],
  }),
}));

export const courseRelations = relations(courses, ({ one, many }) => ({
  user: one(users, {
    fields: [courses.userId],
    references: [users.id],
  }),
  modules: many(courseModules),
  notes: many(notes),
  tasks: many(tasks),
  flashcardDecks: many(flashcardDecks),
  studySessions: many(studySessions),
}));

export const courseModuleRelations = relations(courseModules, ({ one, many }) => ({
  course: one(courses, {
    fields: [courseModules.courseId],
    references: [courses.id],
  }),
  lessons: many(courseLessons),
}));

export const courseLessonRelations = relations(courseLessons, ({ one }) => ({
  module: one(courseModules, {
    fields: [courseLessons.moduleId],
    references: [courseModules.id],
  }),
}));

export const noteRelations = relations(notes, ({ one, many }) => ({
  user: one(users, {
    fields: [notes.userId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [notes.courseId],
    references: [courses.id],
  }),
  document: one(documents, {
    fields: [notes.documentId],
    references: [documents.id],
  }),
  flashcards: many(flashcards),
}));

export const flashcardDeckRelations = relations(flashcardDecks, ({ one, many }) => ({
  user: one(users, {
    fields: [flashcardDecks.userId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [flashcardDecks.courseId],
    references: [courses.id],
  }),
  document: one(documents, {
    fields: [flashcardDecks.documentId],
    references: [documents.id],
  }),
  note: one(notes, {
    fields: [flashcardDecks.noteId],
    references: [notes.id],
  }),
  flashcards: many(flashcards),
  studySessions: many(studySessions),
}));

export const flashcardRelations = relations(flashcards, ({ one, many }) => ({
  deck: one(flashcardDecks, {
    fields: [flashcards.deckId],
    references: [flashcardDecks.id],
  }),
  user: one(users, {
    fields: [flashcards.userId],
    references: [users.id],
  }),
  document: one(documents, {
    fields: [flashcards.documentId],
    references: [documents.id],
  }),
  note: one(notes, {
    fields: [flashcards.noteId],
    references: [notes.id],
  }),
  reviewEvents: many(flashcardReviewEvents),
}));

export const flashcardReviewEventRelations = relations(flashcardReviewEvents, ({ one }) => ({
  flashcard: one(flashcards, {
    fields: [flashcardReviewEvents.flashcardId],
    references: [flashcards.id],
  }),
  user: one(users, {
    fields: [flashcardReviewEvents.userId],
    references: [users.id],
  }),
}));

export const taskRelations = relations(tasks, ({ one }) => ({
  user: one(users, {
    fields: [tasks.userId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [tasks.courseId],
    references: [courses.id],
  }),
}));

export const studySessionRelations = relations(studySessions, ({ one }) => ({
  user: one(users, {
    fields: [studySessions.userId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [studySessions.courseId],
    references: [courses.id],
  }),
  document: one(documents, {
    fields: [studySessions.documentId],
    references: [documents.id],
  }),
  deck: one(flashcardDecks, {
    fields: [studySessions.deckId],
    references: [flashcardDecks.id],
  }),
  aiUsageLog: one(aiUsageLogs, {
    fields: [studySessions.aiUsageLogId],
    references: [aiUsageLogs.id],
  }),
}));

import { pgTable, uuid, text, timestamp, integer, real, index } from 'drizzle-orm/pg-core';
import { users } from './users.js';

export const courses = pgTable(
  'courses',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    courseName: text('course_name').notNull(),
    courseCode: text('course_code'),
    credits: integer('credits').notNull().default(3),
    grade: text('grade'),
    gradePoints: real('grade_points'),
    term: text('term'),
    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('courses_user_id_idx').on(table.userId),
    codeIdx: index('courses_code_idx').on(table.courseCode),
  })
);

export const courseModules = pgTable(
  'course_modules',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    courseId: uuid('course_id')
      .references(() => courses.id, { onDelete: 'cascade' })
      .notNull(),
    title: text('title').notNull(),
    description: text('description'),
    orderIndex: integer('order_index').notNull().default(0),
    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    courseIdIdx: index('course_modules_course_id_idx').on(table.courseId),
  })
);

export const courseLessons = pgTable(
  'course_lessons',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    moduleId: uuid('module_id')
      .references(() => courseModules.id, { onDelete: 'cascade' })
      .notNull(),
    title: text('title').notNull(),
    content: text('content'),
    orderIndex: integer('order_index').notNull().default(0),
    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    moduleIdIdx: index('course_lessons_module_id_idx').on(table.moduleId),
  })
);

export type Course = typeof courses.$inferSelect;
export type NewCourse = typeof courses.$inferInsert;
export type CourseModule = typeof courseModules.$inferSelect;
export type NewCourseModule = typeof courseModules.$inferInsert;
export type CourseLesson = typeof courseLessons.$inferSelect;
export type NewCourseLesson = typeof courseLessons.$inferInsert;

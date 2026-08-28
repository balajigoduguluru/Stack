import { pgTable, uuid, text, timestamp, integer, boolean, jsonb, index } from 'drizzle-orm/pg-core';
import { users } from './users.js';

export const documents = pgTable(
  'documents',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    title: text('title').notNull(),
    fileType: text('file_type').notNull().default('pdf'),
    mimeType: text('mime_type').notNull().default('application/pdf'),
    s3Key: text('s3_key').notNull(),
    s3Url: text('s3_url').notNull(),
    sizeBytes: integer('size_bytes').notNull(),
    pageCount: integer('page_count').notNull().default(1),
    processingStatus: text('processing_status').notNull().default('pending'),
    extractionStatus: text('extraction_status').notNull().default('pending'),
    indexingStatus: text('indexing_status').notNull().default('pending'),
    isProcessedByAi: boolean('is_processed_by_ai').default(false).notNull(),
    fileMetadata: jsonb('file_metadata').default({}).notNull(),
    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('documents_user_id_idx').on(table.userId),
    statusIdx: index('documents_status_idx').on(table.processingStatus),
    createdAtIdx: index('documents_created_at_idx').on(table.createdAt),
  })
);

export const documentPages = pgTable(
  'document_pages',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    documentId: uuid('document_id')
      .references(() => documents.id, { onDelete: 'cascade' })
      .notNull(),
    pageNumber: integer('page_number').notNull(),
    content: text('content').notNull(),
    metadata: jsonb('metadata').default({}).notNull(),
    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    docIdIdx: index('doc_pages_doc_id_idx').on(table.documentId),
    pageNumIdx: index('doc_pages_num_idx').on(table.documentId, table.pageNumber),
  })
);

export const documentChunks = pgTable(
  'document_chunks',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    documentId: uuid('document_id')
      .references(() => documents.id, { onDelete: 'cascade' })
      .notNull(),
    pageId: uuid('page_id').references(() => documentPages.id, { onDelete: 'cascade' }),
    chunkIndex: integer('chunk_index').notNull(),
    content: text('content').notNull(),
    embedding: text('embedding'),
    metadata: jsonb('metadata').default({}).notNull(),
    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    docIdIdx: index('doc_chunks_doc_id_idx').on(table.documentId),
    pageIdIdx: index('doc_chunks_page_id_idx').on(table.pageId),
    chunkIdx: index('doc_chunks_index_idx').on(table.documentId, table.chunkIndex),
  })
);

export type Document = typeof documents.$inferSelect;
export type NewDocument = typeof documents.$inferInsert;
export type DocumentPage = typeof documentPages.$inferSelect;
export type NewDocumentPage = typeof documentPages.$inferInsert;
export type DocumentChunk = typeof documentChunks.$inferSelect;
export type NewDocumentChunk = typeof documentChunks.$inferInsert;

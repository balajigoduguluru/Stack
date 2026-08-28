-- Incremental Migration 0002: Production Domain Redesign

-- 1. Users table additions
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "role" text DEFAULT 'student' NOT NULL;
CREATE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");
CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" ("created_at");

-- 2. User Profiles
CREATE TABLE IF NOT EXISTS "user_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL UNIQUE,
	"bio" text,
	"avatar_url" text,
	"academic_institution" text,
	"major_field_of_study" text,
	"timezone" text DEFAULT 'UTC' NOT NULL,
	"preferences_json" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action
);
CREATE INDEX IF NOT EXISTS "user_profiles_user_id_idx" ON "user_profiles" ("user_id");

-- 3. Subscriptions table adjustments & Subscription Periods
ALTER TABLE "subscriptions" DROP CONSTRAINT IF EXISTS "subscriptions_user_id_users_id_fk";
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "status" text DEFAULT 'active' NOT NULL;
ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "current_period_start" timestamp with time zone;
ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "cancel_at_period_end" boolean DEFAULT false NOT NULL;

CREATE INDEX IF NOT EXISTS "subscriptions_user_id_idx" ON "subscriptions" ("user_id");
CREATE INDEX IF NOT EXISTS "subscriptions_status_idx" ON "subscriptions" ("status");
CREATE INDEX IF NOT EXISTS "subscriptions_stripe_cust_idx" ON "subscriptions" ("stripe_customer_id");

CREATE TABLE IF NOT EXISTS "subscription_periods" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"subscription_id" uuid NOT NULL,
	"user_id" uuid,
	"period_start" timestamp with time zone NOT NULL,
	"period_end" timestamp with time zone NOT NULL,
	"credits_allocated" integer DEFAULT 100 NOT NULL,
	"credits_consumed" integer DEFAULT 0 NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "sub_periods_sub_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "public"."subscriptions"("id") ON DELETE cascade ON UPDATE no action,
	CONSTRAINT "sub_periods_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action
);
CREATE INDEX IF NOT EXISTS "sub_periods_sub_id_idx" ON "subscription_periods" ("subscription_id");
CREATE INDEX IF NOT EXISTS "sub_periods_user_id_idx" ON "subscription_periods" ("user_id");
CREATE INDEX IF NOT EXISTS "sub_periods_range_idx" ON "subscription_periods" ("period_start", "period_end");

-- 4. AI Usage Logs Ledger
CREATE TABLE IF NOT EXISTS "ai_usage_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"subscription_id" uuid,
	"subscription_period_id" uuid,
	"request_id" text NOT NULL,
	"model" text NOT NULL,
	"provider" text NOT NULL,
	"prompt_mode" text,
	"input_tokens" integer DEFAULT 0 NOT NULL,
	"output_tokens" integer DEFAULT 0 NOT NULL,
	"total_tokens" integer DEFAULT 0 NOT NULL,
	"credits_consumed" integer DEFAULT 1 NOT NULL,
	"estimated_cost_usd" real DEFAULT 0 NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"timestamp" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "ai_usage_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action,
	CONSTRAINT "ai_usage_sub_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "public"."subscriptions"("id") ON DELETE set null ON UPDATE no action,
	CONSTRAINT "ai_usage_sub_period_id_fk" FOREIGN KEY ("subscription_period_id") REFERENCES "public"."subscription_periods"("id") ON DELETE set null ON UPDATE no action
);
CREATE INDEX IF NOT EXISTS "ai_usage_user_id_idx" ON "ai_usage_logs" ("user_id");
CREATE INDEX IF NOT EXISTS "ai_usage_request_id_idx" ON "ai_usage_logs" ("request_id");
CREATE INDEX IF NOT EXISTS "ai_usage_sub_period_idx" ON "ai_usage_logs" ("subscription_period_id");
CREATE INDEX IF NOT EXISTS "ai_usage_timestamp_idx" ON "ai_usage_logs" ("timestamp");

-- 5. Documents table additions & Pages / Chunks
ALTER TABLE "documents" ADD COLUMN IF NOT EXISTS "file_type" text DEFAULT 'pdf' NOT NULL;
ALTER TABLE "documents" ADD COLUMN IF NOT EXISTS "mime_type" text DEFAULT 'application/pdf' NOT NULL;
ALTER TABLE "documents" ADD COLUMN IF NOT EXISTS "s3_key" text DEFAULT '' NOT NULL;
ALTER TABLE "documents" ADD COLUMN IF NOT EXISTS "page_count" integer DEFAULT 1 NOT NULL;
ALTER TABLE "documents" ADD COLUMN IF NOT EXISTS "processing_status" text DEFAULT 'pending' NOT NULL;
ALTER TABLE "documents" ADD COLUMN IF NOT EXISTS "extraction_status" text DEFAULT 'pending' NOT NULL;
ALTER TABLE "documents" ADD COLUMN IF NOT EXISTS "indexing_status" text DEFAULT 'pending' NOT NULL;
ALTER TABLE "documents" ADD COLUMN IF NOT EXISTS "file_metadata" jsonb DEFAULT '{}'::jsonb NOT NULL;

CREATE INDEX IF NOT EXISTS "documents_user_id_idx" ON "documents" ("user_id");
CREATE INDEX IF NOT EXISTS "documents_status_idx" ON "documents" ("processing_status");
CREATE INDEX IF NOT EXISTS "documents_created_at_idx" ON "documents" ("created_at");

CREATE TABLE IF NOT EXISTS "document_pages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"document_id" uuid NOT NULL,
	"page_number" integer NOT NULL,
	"content" text NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "doc_pages_doc_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action
);
CREATE INDEX IF NOT EXISTS "doc_pages_doc_id_idx" ON "document_pages" ("document_id");
CREATE INDEX IF NOT EXISTS "doc_pages_num_idx" ON "document_pages" ("document_id", "page_number");

CREATE TABLE IF NOT EXISTS "document_chunks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"document_id" uuid NOT NULL,
	"page_id" uuid,
	"chunk_index" integer NOT NULL,
	"content" text NOT NULL,
	"embedding" text,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "doc_chunks_doc_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action,
	CONSTRAINT "doc_chunks_page_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."document_pages"("id") ON DELETE cascade ON UPDATE no action
);
CREATE INDEX IF NOT EXISTS "doc_chunks_doc_id_idx" ON "document_chunks" ("document_id");
CREATE INDEX IF NOT EXISTS "doc_chunks_page_id_idx" ON "document_chunks" ("page_id");
CREATE INDEX IF NOT EXISTS "doc_chunks_index_idx" ON "document_chunks" ("document_id", "chunk_index");

-- 6. Course Modules & Lessons
CREATE TABLE IF NOT EXISTS "course_modules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"course_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"order_index" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "course_modules_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action
);
CREATE INDEX IF NOT EXISTS "course_modules_course_id_idx" ON "course_modules" ("course_id");

CREATE TABLE IF NOT EXISTS "course_lessons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"module_id" uuid NOT NULL,
	"title" text NOT NULL,
	"content" text,
	"order_index" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "course_lessons_module_id_fk" FOREIGN KEY ("module_id") REFERENCES "public"."course_modules"("id") ON DELETE cascade ON UPDATE no action
);
CREATE INDEX IF NOT EXISTS "course_lessons_module_id_idx" ON "course_lessons" ("module_id");

-- 7. Notes table additions
ALTER TABLE "notes" ADD COLUMN IF NOT EXISTS "course_id" uuid;
ALTER TABLE "notes" ADD COLUMN IF NOT EXISTS "document_id" uuid;

DO $$ BEGIN
 ALTER TABLE "notes" ADD CONSTRAINT "notes_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
 ALTER TABLE "notes" ADD CONSTRAINT "notes_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE INDEX IF NOT EXISTS "notes_user_id_idx" ON "notes" ("user_id");
CREATE INDEX IF NOT EXISTS "notes_course_id_idx" ON "notes" ("course_id");
CREATE INDEX IF NOT EXISTS "notes_document_id_idx" ON "notes" ("document_id");
CREATE INDEX IF NOT EXISTS "notes_created_at_idx" ON "notes" ("created_at");
CREATE INDEX IF NOT EXISTS "notes_updated_at_idx" ON "notes" ("updated_at");

-- 8. Flashcard Decks & Review Events
CREATE TABLE IF NOT EXISTS "flashcard_decks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"course_id" uuid,
	"document_id" uuid,
	"note_id" uuid,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "decks_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action,
	CONSTRAINT "decks_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action,
	CONSTRAINT "decks_document_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action,
	CONSTRAINT "decks_note_id_fk" FOREIGN KEY ("note_id") REFERENCES "public"."notes"("id") ON DELETE set null ON UPDATE no action
);
CREATE INDEX IF NOT EXISTS "decks_user_id_idx" ON "flashcard_decks" ("user_id");
CREATE INDEX IF NOT EXISTS "decks_course_id_idx" ON "flashcard_decks" ("course_id");

ALTER TABLE "flashcards" ADD COLUMN IF NOT EXISTS "deck_id" uuid;
DO $$ BEGIN
 ALTER TABLE "flashcards" ADD CONSTRAINT "flashcards_deck_id_decks_id_fk" FOREIGN KEY ("deck_id") REFERENCES "public"."flashcard_decks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE INDEX IF NOT EXISTS "flashcards_deck_id_idx" ON "flashcards" ("deck_id");
CREATE INDEX IF NOT EXISTS "flashcards_user_id_idx" ON "flashcards" ("user_id");
CREATE INDEX IF NOT EXISTS "flashcards_next_review_idx" ON "flashcards" ("next_review_at");

CREATE TABLE IF NOT EXISTS "flashcard_review_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"flashcard_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"rating" integer NOT NULL,
	"reviewed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"repetitions" integer DEFAULT 1 NOT NULL,
	"interval_days" integer DEFAULT 1 NOT NULL,
	"ease_factor" real DEFAULT 2.5 NOT NULL,
	"stability" real DEFAULT 1.0 NOT NULL,
	"difficulty" real DEFAULT 5.0 NOT NULL,
	"next_review_at" timestamp with time zone NOT NULL,
	CONSTRAINT "review_events_card_id_fk" FOREIGN KEY ("flashcard_id") REFERENCES "public"."flashcards"("id") ON DELETE cascade ON UPDATE no action,
	CONSTRAINT "review_events_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action
);
CREATE INDEX IF NOT EXISTS "review_events_card_id_idx" ON "flashcard_review_events" ("flashcard_id");
CREATE INDEX IF NOT EXISTS "review_events_user_id_idx" ON "flashcard_review_events" ("user_id");
CREATE INDEX IF NOT EXISTS "review_events_next_review_idx" ON "flashcard_review_events" ("next_review_at");

-- 9. Tasks table additions
ALTER TABLE "tasks" ADD COLUMN IF NOT EXISTS "course_id" uuid;
ALTER TABLE "tasks" ADD COLUMN IF NOT EXISTS "status" text DEFAULT 'todo' NOT NULL;
ALTER TABLE "tasks" ADD COLUMN IF NOT EXISTS "priority" text DEFAULT 'medium' NOT NULL;
ALTER TABLE "tasks" ADD COLUMN IF NOT EXISTS "completed_at" timestamp with time zone;

DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE INDEX IF NOT EXISTS "tasks_user_id_idx" ON "tasks" ("user_id");
CREATE INDEX IF NOT EXISTS "tasks_course_id_idx" ON "tasks" ("course_id");
CREATE INDEX IF NOT EXISTS "tasks_status_idx" ON "tasks" ("status");
CREATE INDEX IF NOT EXISTS "tasks_due_date_idx" ON "tasks" ("due_date");

-- 10. Study Sessions
CREATE TABLE IF NOT EXISTS "study_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"course_id" uuid,
	"document_id" uuid,
	"deck_id" uuid,
	"ai_usage_log_id" uuid,
	"start_time" timestamp with time zone DEFAULT now() NOT NULL,
	"end_time" timestamp with time zone,
	"duration_seconds" integer DEFAULT 0 NOT NULL,
	"study_type" text DEFAULT 'reading' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "sessions_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action,
	CONSTRAINT "sessions_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action,
	CONSTRAINT "sessions_document_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action,
	CONSTRAINT "sessions_deck_id_fk" FOREIGN KEY ("deck_id") REFERENCES "public"."flashcard_decks"("id") ON DELETE set null ON UPDATE no action,
	CONSTRAINT "sessions_ai_log_id_fk" FOREIGN KEY ("ai_usage_log_id") REFERENCES "public"."ai_usage_logs"("id") ON DELETE set null ON UPDATE no action
);
CREATE INDEX IF NOT EXISTS "study_sessions_user_id_idx" ON "study_sessions" ("user_id");
CREATE INDEX IF NOT EXISTS "study_sessions_course_id_idx" ON "study_sessions" ("course_id");
CREATE INDEX IF NOT EXISTS "study_sessions_start_time_idx" ON "study_sessions" ("start_time");

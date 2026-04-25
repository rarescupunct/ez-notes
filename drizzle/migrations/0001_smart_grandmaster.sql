ALTER TABLE "notes" ADD COLUMN "image_url" text;--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "type" text DEFAULT 'text' NOT NULL;
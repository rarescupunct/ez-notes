CREATE TABLE "notes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"body" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"edited_at" timestamp DEFAULT now(),
	CONSTRAINT "notes_name_unique" UNIQUE("name")
);

import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const notes = pgTable('notes', {
  id:        serial('id').primaryKey(),
  name:      text('name').notNull().unique(),
  body:      text('body'),
  imageUrl:  text('image_url'),
  type:      text('type').notNull().default('text'), 
  createdAt: timestamp('created_at').defaultNow(),
  editedAt:  timestamp('edited_at').defaultNow(),
});

import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
  id: serial('id').primaryKey(),
  email: text('email').primaryKey(),
  // role_id: integer('role_id'),
});

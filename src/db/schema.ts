import {
  integer,
  pgTable,
  text,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

export const donSpecials = pgTable(
  "don_specials",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    code: varchar("code", { length: 16 }).notNull(),
    nom: text("nom").notNull(),
    prenom: text("prenom").notNull(),
    telephone: text("telephone").notNull(),
    email: text("email"),
    status: varchar("status", { length: 32 }).notNull().default("pending"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    notifiedAt: timestamp("notified_at", { withTimezone: true }),
  },
  (table) => [unique("don_specials_code_unique").on(table.code)]
);

export const notificationLogs = pgTable("notification_logs", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  donSpecialId: varchar("don_special_id", { length: 36 })
    .notNull()
    .references(() => donSpecials.id),
  type: varchar("type", { length: 64 }).notNull(),
  channel: varchar("channel", { length: 64 }).notNull(),
  payload: text("payload").notNull(),
  status: varchar("status", { length: 32 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const appSettings = pgTable("app_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const donSpecials = pgTable("don_specials", {
  id: uuid("id").defaultRandom().primaryKey(),
  code: varchar("code", { length: 20 }).notNull().unique(),
  nom: varchar("nom", { length: 255 }).notNull(),
  prenom: varchar("prenom", { length: 255 }).notNull(),
  telephone: varchar("telephone", { length: 50 }).notNull(),
  email: varchar("email", { length: 255 }),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  notifiedAt: timestamp("notified_at", { withTimezone: true }),
});

export const appSettings = pgTable("app_settings", {
  key: varchar("key", { length: 100 }).primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const notificationLogs = pgTable("notification_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  donSpecialId: uuid("don_special_id").references(() => donSpecials.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 50 }).notNull().default("NEW_DON_SPECIAL"),
  channel: varchar("channel", { length: 50 }).notNull().default("SIMULATED_ADMIN_NOTIF"),
  payload: text("payload").notNull(),
  status: varchar("status", { length: 50 }).notNull().default("SUCCESS"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type DonSpecial = typeof donSpecials.$inferSelect;
export type NewDonSpecial = typeof donSpecials.$inferInsert;
export type AppSetting = typeof appSettings.$inferSelect;
export type NotificationLog = typeof notificationLogs.$inferSelect;

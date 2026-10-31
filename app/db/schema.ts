// Kept in step with the hand-written migration drizzle/0000_media.sql: the media library, one row per uploaded file,
// its byte history, and the change log the triggers on `media` write. 0001_cron_runs.sql holds site-runtime's table and
// 0002_site_api_store.sql site-api's, which only each package reads and writes.
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const media = sqliteTable("media", {
  key: text("key").primaryKey(),
  filename: text("filename"),
  contentType: text("content_type").notNull(),
  bytes: integer("bytes").notNull(),
  width: integer("width"),
  height: integer("height"),
  sha256: text("sha256").notNull(),
  alt: text("alt").notNull().default(""),
  caption: text("caption").notNull().default(""),
  tags: text("tags").notNull().default("[]"),
  focus: text("focus"),
  credit: text("credit").notNull().default(""),
  license: text("license").notNull().default(""),
  sourceUrl: text("source_url"),
  licenseExpires: text("license_expires"),
  takenAt: text("taken_at"),
  uploadedAt: text("uploaded_at").notNull(),
  trashedAt: text("trashed_at"),
  rev: integer("rev").notNull().default(0),
  placeholder: text("placeholder"),
  color: text("color"),
});

export const mediaRevisions = sqliteTable("media_revisions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  mediaKey: text("media_key").notNull(),
  at: text("at").notNull(),
  bytes: integer("bytes").notNull(),
  width: integer("width"),
  height: integer("height"),
  reason: text("reason").notNull(),
  sha256: text("sha256").notNull(),
  copyKey: text("copy_key"),
});

export const mediaChanges = sqliteTable("media_changes", {
  seq: integer("seq").primaryKey({ autoIncrement: true }),
  mediaKey: text("media_key").notNull(),
});

export type MediaRow = typeof media.$inferSelect;
export type MediaRevisionRow = typeof mediaRevisions.$inferSelect;

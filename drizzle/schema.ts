import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const devices = mysqlTable("devices", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  vendor: varchar("vendor", { length: 80 }).notNull(),
  sourceFile: varchar("sourceFile", { length: 255 }),
  sourceKey: varchar("sourceKey", { length: 255 }),
  sourceUrl: varchar("sourceUrl", { length: 512 }),
  sourceHash: varchar("sourceHash", { length: 128 }),
  status: mysqlEnum("status", ["ready", "scanning", "complete"]).default("ready").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const auditRuns = mysqlTable("auditRuns", {
  id: int("id").autoincrement().primaryKey(),
  deviceId: int("deviceId").notNull(),
  framework: varchar("framework", { length: 120 }).notNull(),
  status: mysqlEnum("status", ["queued", "running", "complete", "failed"]).default("queued").notNull(),
  passRate: int("passRate").default(0).notNull(),
  startedAt: timestamp("startedAt"),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const findings = mysqlTable("findings", {
  id: int("id").autoincrement().primaryKey(),
  auditRunId: int("auditRunId").notNull(),
  controlName: varchar("controlName", { length: 160 }).notNull(),
  framework: varchar("framework", { length: 120 }).notNull(),
  state: mysqlEnum("state", ["PASS", "FAIL", "UNKNOWN"]).notNull(),
  detail: text("detail").notNull(),
  remediation: text("remediation"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const learnedMappings = mysqlTable("learnedMappings", {
  id: int("id").autoincrement().primaryKey(),
  rawCommand: text("rawCommand").notNull(),
  normalizedMeaning: varchar("normalizedMeaning", { length: 255 }).notNull(),
  confidence: int("confidence").default(0).notNull(),
  confirmedBy: int("confirmedBy"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const auditReports = mysqlTable("auditReports", {
  id: int("id").autoincrement().primaryKey(),
  auditRunId: int("auditRunId").notNull(),
  format: varchar("format", { length: 30 }).notNull(),
  status: mysqlEnum("status", ["queued", "ready"]).default("queued").notNull(),
  fileKey: varchar("fileKey", { length: 255 }),
  fileUrl: varchar("fileUrl", { length: 512 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const evidenceRecords = mysqlTable("evidenceRecords", {
  id: int("id").autoincrement().primaryKey(),
  auditRunId: int("auditRunId").notNull(),
  blockNumber: int("blockNumber").notNull(),
  sha256: varchar("sha256", { length: 128 }).notNull(),
  recordType: varchar("recordType", { length: 80 }).notNull(),
  verified: mysqlEnum("verified", ["yes", "no"]).default("yes").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Device = typeof devices.$inferSelect;
export type AuditRun = typeof auditRuns.$inferSelect;
export type Finding = typeof findings.$inferSelect;
export type LearnedMapping = typeof learnedMappings.$inferSelect;
export type EvidenceRecord = typeof evidenceRecords.$inferSelect;
export type AuditReport = typeof auditReports.$inferSelect;

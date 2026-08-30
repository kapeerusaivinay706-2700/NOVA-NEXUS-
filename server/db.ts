import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

import { desc } from "drizzle-orm";
import { createHash } from "node:crypto";
import { auditReports, auditRuns, devices, evidenceRecords, findings, learnedMappings } from "../drizzle/schema";
import { storagePut } from "./storage";

export async function getWorkspaceData() {
  const db = await getDb();
  if (!db) return { devices: [], runs: [], findings: [], mappings: [], evidence: [] };
  const [deviceRows, runRows, findingRows, mappingRows, evidenceRows] = await Promise.all([
    db.select().from(devices).orderBy(desc(devices.id)).limit(25),
    db.select().from(auditRuns).orderBy(desc(auditRuns.id)).limit(25),
    db.select().from(findings).orderBy(desc(findings.id)).limit(100),
    db.select().from(learnedMappings).orderBy(desc(learnedMappings.id)).limit(25),
    db.select().from(evidenceRecords).orderBy(desc(evidenceRecords.id)).limit(25),
  ]);
  return { devices: deviceRows, runs: runRows, findings: findingRows, mappings: mappingRows, evidence: evidenceRows };
}

export async function createDevice(input: { name: string; vendor: string; sourceFile?: string; sourceKey?: string; sourceUrl?: string; sourceHash?: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.insert(devices).values({ name: input.name, vendor: input.vendor, sourceFile: input.sourceFile ?? null, sourceKey: input.sourceKey ?? null, sourceUrl: input.sourceUrl ?? null, sourceHash: input.sourceHash ?? null, status: "ready" });
  const rows = await db.select().from(devices).orderBy(desc(devices.id)).limit(1);
  return rows[0];
}

export async function createAuditRun(input: { deviceId: number; framework: string; findings: Array<{ controlName: string; framework: string; state: "PASS" | "FAIL" | "UNKNOWN"; detail: string; remediation?: string }>; sha256: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const passRate = Math.round((input.findings.filter((finding) => finding.state === "PASS").length / Math.max(input.findings.length, 1)) * 100);
  await db.insert(auditRuns).values({ deviceId: input.deviceId, framework: input.framework, status: "complete", passRate, startedAt: new Date(), completedAt: new Date() });
  const runRows = await db.select().from(auditRuns).orderBy(desc(auditRuns.id)).limit(1);
  const run = runRows[0];
  if (!run) throw new Error("Audit run was not created");
  await db.insert(findings).values(input.findings.map((finding) => ({ auditRunId: run.id, ...finding })));
  await db.insert(evidenceRecords).values({ auditRunId: run.id, blockNumber: run.id + 480, sha256: input.sha256, recordType: "configuration-audit", verified: "yes" });
  return run;
}

export async function ingestConfig(input: { name: string; vendor: string; fileName: string; content: string }) {
  const hash = createHash("sha256").update(input.content).digest("hex");
  const uploaded = await storagePut(`nova-nexus/configurations/${input.fileName}`, input.content, "text/plain");
  return createDevice({ name: input.name, vendor: input.vendor, sourceFile: input.fileName, sourceKey: uploaded.key, sourceUrl: uploaded.url, sourceHash: hash });
}

export async function verifyEvidence(input: { auditRunId: number; sha256: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const rows = await db.select().from(evidenceRecords).where(eq(evidenceRecords.auditRunId, input.auditRunId)).limit(1);
  const record = rows[0];
  return { verified: Boolean(record && record.sha256 === input.sha256), record };
}

export async function createReport(input: { auditRunId: number; report: string; format: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const uploaded = await storagePut(`nova-nexus/reports/audit-${input.auditRunId}.${input.format}`, input.report, "text/plain");
  await db.insert(auditReports).values({ auditRunId: input.auditRunId, format: input.format, status: "ready", fileKey: uploaded.key, fileUrl: uploaded.url });
  const rows = await db.select().from(auditReports).orderBy(desc(auditReports.id)).limit(1);
  return rows[0];
}

export async function saveLearnedMapping(input: { rawCommand: string; normalizedMeaning: string; confidence: number; confirmedBy?: number }) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.insert(learnedMappings).values({ ...input, confirmedBy: input.confirmedBy ?? null });
  const rows = await db.select().from(learnedMappings).orderBy(desc(learnedMappings.id)).limit(1);
  return rows[0];
}

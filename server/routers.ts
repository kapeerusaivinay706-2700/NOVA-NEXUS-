import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createAuditRun, createDevice, createReport, getWorkspaceData, ingestConfig, saveLearnedMapping, verifyEvidence } from "./db";

const findingInput = z.object({ controlName: z.string().min(1), framework: z.string().min(1), state: z.enum(["PASS", "FAIL", "UNKNOWN"]), detail: z.string().min(1), remediation: z.string().optional() });

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  workspace: router({
    get: publicProcedure.query(() => getWorkspaceData()),
    createDevice: publicProcedure.input(z.object({ name: z.string().min(1), vendor: z.string().min(1), sourceFile: z.string().optional() })).mutation(({ input }) => createDevice(input)),
    ingestConfig: publicProcedure.input(z.object({ name: z.string().min(1), vendor: z.string().min(1), fileName: z.string().min(1), content: z.string().min(1) })).mutation(({ input }) => ingestConfig(input)),
    runAudit: publicProcedure.input(z.object({ deviceId: z.number().int().positive(), framework: z.string().min(1), sha256: z.string().min(8), findings: z.array(findingInput).min(1) })).mutation(({ input }) => createAuditRun(input)),
    confirmMapping: publicProcedure.input(z.object({ rawCommand: z.string().min(1), normalizedMeaning: z.string().min(1), confidence: z.number().int().min(0).max(100) })).mutation(({ input }) => saveLearnedMapping(input)),
    verifyEvidence: publicProcedure.input(z.object({ auditRunId: z.number().int().positive(), sha256: z.string().min(8) })).query(({ input }) => verifyEvidence(input)),
    createReport: publicProcedure.input(z.object({ auditRunId: z.number().int().positive(), report: z.string().min(1), format: z.enum(["txt", "json", "pdf"]) })).mutation(({ input }) => createReport(input)),
  }),
});

export type AppRouter = typeof appRouter;

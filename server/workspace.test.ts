import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createContext(): TrpcContext {
  return {
    user: undefined,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("workspace procedures", () => {
  it("rejects audit runs without a device id", async () => {
    const caller = appRouter.createCaller(createContext());
    await expect(caller.workspace.runAudit({
      deviceId: 0,
      framework: "CIS Benchmarks",
      sha256: "89f3c0d4",
      findings: [{ controlName: "SSH version", framework: "CIS Benchmarks", state: "PASS", detail: "SSH v2 enforced" }],
    })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("rejects low-confidence mapping payloads outside the accepted range", async () => {
    const caller = appRouter.createCaller(createContext());
    await expect(caller.workspace.confirmMapping({ rawCommand: "ntp server 10.0.0.1", normalizedMeaning: "NTP enabled", confidence: 101 })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});

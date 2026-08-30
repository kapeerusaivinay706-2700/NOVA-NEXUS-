import { describe, expect, it } from "vitest";
import { renderPdf } from "./db";

describe("NOVA NEXUS PDF reports", () => {
  it("renders a PDF signature for audit exports", async () => {
    const pdf = await renderPdf("Device: edge-router-04\nResult: PASS");
    expect(pdf.subarray(0, 5).toString()).toBe("%PDF-");
    expect(pdf.length).toBeGreaterThan(500);
  });
});

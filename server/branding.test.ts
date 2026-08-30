import { describe, expect, it } from "vitest";

describe("NOVA NEXUS branding configuration", () => {
  it("uses the requested managed application title", () => {
    expect(process.env.VITE_APP_TITLE).toBe("NOVA NEXUS");
  });
});

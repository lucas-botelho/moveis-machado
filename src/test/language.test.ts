import { describe, expect, it } from "vitest";
import { resolveLanguage } from "@/lib/site-content";

describe("Website language selection", () => {
  it("defaults to Portuguese and accepts Portuguese selection", () => {
    expect(resolveLanguage(undefined)).toBe("pt");
    expect(resolveLanguage("pt")).toBe("pt");
    expect(resolveLanguage("fr")).toBe("pt");
  });
  it("supports English selection", () => {
    expect(resolveLanguage("en")).toBe("en");
  });
});

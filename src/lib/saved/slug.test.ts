import { describe, it, expect } from "vitest";
import { isKnownSlug } from "./slug";
import { places } from "@/lib/places/data";

describe("isKnownSlug — 찜 쓰기 보안 경계", () => {
  it("실제 존재하는 공간 slug는 통과", () => {
    expect(isKnownSlug(places[0].slug)).toBe(true);
  });

  it("존재하지 않는 slug는 거부", () => {
    expect(isKnownSlug("does-not-exist")).toBe(false);
  });

  it("문자열이 아니면 거부", () => {
    expect(isKnownSlug(undefined)).toBe(false);
    expect(isKnownSlug(123)).toBe(false);
    expect(isKnownSlug({ slug: "x" })).toBe(false);
  });
});

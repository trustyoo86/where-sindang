import { places } from "@/lib/places/data";

const SLUGS = new Set(places.map((p) => p.slug));

/** A place slug we actually serve. Guards the 찜 write path against junk rows. */
export const isKnownSlug = (s: unknown): s is string =>
  typeof s === "string" && SLUGS.has(s);

import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

// Lazy: don't touch DATABASE_URL at import time, or `next build` page-collection blows up.
let _sql: NeonQueryFunction<false, false> | null = null;
const db = () => (_sql ??= neon(process.env.DATABASE_URL!));

// ponytail: no migration tool. One table, created once per cold start.
let ready: Promise<unknown> | null = null;
function ensure() {
  return (ready ??= db()`
    CREATE TABLE IF NOT EXISTS saved_places (
      user_key   text NOT NULL,
      place_slug text NOT NULL,
      created_at timestamptz DEFAULT now(),
      PRIMARY KEY (user_key, place_slug)
    )`);
}

export async function listSaved(userKey: string): Promise<string[]> {
  await ensure();
  const rows = await db()`SELECT place_slug FROM saved_places WHERE user_key = ${userKey}`;
  return rows.map((r) => r.place_slug as string);
}

/** Toggle one place. Returns true if now saved, false if removed. */
export async function toggleSaved(userKey: string, slug: string): Promise<boolean> {
  await ensure();
  const removed = await db()`
    DELETE FROM saved_places WHERE user_key = ${userKey} AND place_slug = ${slug}
    RETURNING place_slug`;
  if (removed.length) return false;
  await db()`INSERT INTO saved_places (user_key, place_slug) VALUES (${userKey}, ${slug})`;
  return true;
}

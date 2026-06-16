"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Ctx = { authed: boolean; has: (slug: string) => boolean; toggle: (slug: string) => void };

// Default = logged-out: nothing saved, a click sends you to sign in.
// ponytail: no provider required to render — outside the tree just behaves logged-out.
const DEFAULT: Ctx = {
  authed: false,
  has: () => false,
  toggle: () => {
    if (typeof window !== "undefined") window.location.href = "/api/auth/signin";
  },
};
const SavedContext = createContext<Ctx>(DEFAULT);

export function useSaved() {
  return useContext(SavedContext);
}

export function SavedProvider({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [saved, setSaved] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch("/api/saved")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => {
        setAuthed(true);
        setSaved(new Set(d.saved));
      })
      .catch(() => setAuthed(false));
  }, []);

  function toggle(slug: string) {
    if (!authed) {
      window.location.href = "/api/auth/signin";
      return;
    }
    // optimistic; revert on failure
    const next = new Set(saved);
    if (next.has(slug)) next.delete(slug);
    else next.add(slug);
    setSaved(next);
    fetch("/api/saved", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ slug }),
    }).catch(() => setSaved(saved));
  }

  return (
    <SavedContext.Provider value={{ authed, has: (s) => saved.has(s), toggle }}>
      {children}
    </SavedContext.Provider>
  );
}

"use client";

import { useSaved } from "./SavedProvider";

export function SaveButton({ slug }: { slug: string }) {
  const { has, toggle } = useSaved();
  const on = has(slug);

  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? "찜 해제" : "찜"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      className="flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-110"
    >
      <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden>
        <path
          d="M16 28C7 22 2 16.5 2 11a6.5 6.5 0 0 1 12-3.5A6.5 6.5 0 0 1 26 11c0 5.5-5 11-14 17z"
          fill={on ? "#ff385c" : "rgba(0,0,0,0.4)"}
          stroke="#fff"
          strokeWidth="2"
        />
      </svg>
    </button>
  );
}

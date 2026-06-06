"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { searchPlaces } from "@/lib/places/search";
import { PlaceCard } from "@/components/PlaceCard";

export function PlaceSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");

  const results = searchPlaces(query);

  function handleChange(value: string) {
    setQuery(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  return (
    <div>
      <div className="rounded-[20px] bg-white p-2 shadow-[rgba(0,0,0,0.02)_0_0_0_1px,rgba(0,0,0,0.04)_0_2px_6px_0,rgba(0,0,0,0.1)_0_4px_8px_0]">
        <div className="flex items-center gap-1">
          <input
            type="search"
            value={query}
            onChange={(event) => handleChange(event.target.value)}
            placeholder="공간 이름으로 검색"
            aria-label="공간 이름으로 검색"
            className="min-w-0 flex-1 rounded-[14px] bg-transparent px-4 py-3 text-sm text-[#222222] placeholder:text-[#6a6a6a] focus:outline-none"
          />
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff385c] text-lg font-bold text-white"
          >
            ⌕
          </span>
        </div>
      </div>

      {results.length === 0 ? (
        <p className="mt-6 text-sm leading-6 text-[#6a6a6a]">
          검색 결과가 없어요. 다른 공간 이름으로 찾아보세요.
        </p>
      ) : (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      )}
    </div>
  );
}

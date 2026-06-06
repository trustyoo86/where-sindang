import Link from "next/link";
import type { Place } from "@/lib/notion/types";
import { CATEGORY_LABELS } from "@/lib/notion/types";
import { imageStyles } from "@/lib/places/styles";

export function PlaceCard({ place }: { place: Place }) {
  return (
    <Link href={`/places/${place.slug}`} className="group block">
      <article>
        <div
          className={`relative aspect-[1.05] overflow-hidden rounded-[20px] bg-[#dddddd] transition-transform duration-200 group-hover:scale-[1.02] ${imageStyles[place.cover?.url ?? "warm-table"]}`}
        >
          <span className="absolute left-3 top-3 rounded bg-white px-2.5 py-1.5 text-[11px] font-semibold tracking-[0.04em] text-[#222222] drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]">
            {CATEGORY_LABELS[place.category]}
          </span>
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/20 to-transparent opacity-80" />
        </div>

        <div className="px-1 pt-3">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-sm font-semibold leading-5 tracking-[-0.009em] text-[#222222]">
              {place.title}
            </h3>
            <span className="shrink-0 text-xs font-semibold text-[#222222]">
              ★ 4.{place.id.slice(-1)}
            </span>
          </div>
          <p className="mt-1 line-clamp-2 text-sm leading-5 text-[#6a6a6a]">
            {place.summary}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {place.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded bg-white px-2 py-1 text-[11px] font-medium text-[#6a6a6a]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}

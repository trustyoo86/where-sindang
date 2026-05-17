import type { Place } from "@/lib/notion/types";
import { CATEGORY_LABELS } from "@/lib/notion/types";
import { imageStyles } from "@/lib/places/styles";

type PlaceDetailProps = {
  place: Place;
  variant: "page" | "modal";
};

export function PlaceDetail({ place, variant }: PlaceDetailProps) {
  const titleId = variant === "modal" ? "modal-title" : "page-title";
  const heroBg = imageStyles[place.cover?.url ?? "warm-table"] ?? "";

  const containerClass =
    variant === "page"
      ? "mx-auto w-full max-w-[960px] px-6 pt-10 pb-20"
      : "px-6 pt-8 pb-10 sm:px-10 sm:pt-12";

  return (
    <article className={containerClass}>
      <div className={`relative aspect-[16/10] overflow-hidden rounded-[20px] bg-[#dddddd] ${heroBg}`}>
        <span className="absolute left-4 top-4 rounded bg-white px-3 py-1.5 text-[12px] font-semibold tracking-[0.04em] text-[#222222] drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]">
          {CATEGORY_LABELS[place.category]}
        </span>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent opacity-80" />
      </div>

      <header className="mt-6">
        <h1
          id={titleId}
          className="text-[32px] font-bold leading-[1.12] tracking-[-0.02em] text-[#222222] sm:text-[40px]"
        >
          {place.title}
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#6a6a6a] sm:text-base sm:leading-7">
          {place.address}
        </p>
      </header>
    </article>
  );
}

import type { Place } from "@/lib/notion/types";
import type { Pin } from "@/lib/map/provider";
import { CATEGORY_LABELS } from "@/lib/notion/types";
import { Suspense } from "react";
import { places } from "@/lib/places/data";
import { categoryStyles } from "@/lib/places/styles";
import { PlaceSearch } from "@/components/PlaceSearch";

const pins: Pin[] = places.map((place) => ({
  id: place.id,
  lat: place.lat,
  lng: place.lng,
  category: place.category,
  title: place.title,
}));

const featuredPlace = places[0];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#222222]">
      <section className="mx-auto flex w-full max-w-[1760px] flex-col gap-12 px-4 pb-20 pt-8 sm:px-6 lg:px-10">
        <Hero />

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_420px]">
          <div className="min-w-0">
            <SectionHeader
              title="오늘의 신당"
              description="가볍게 저장해두고 싶은 음식, 카페, 문화, 골목."
            />
            <div className="mt-4">
              <Suspense fallback={null}>
                <PlaceSearch />
              </Suspense>
            </div>
          </div>

          <MapPreview pins={pins} selectedPlace={featuredPlace} />
        </div>
      </section>
    </div>
  );
}

function Hero() {
  return (
    <div className="grid gap-6 pt-2 lg:grid-cols-[minmax(0,1fr)_minmax(360px,520px)] lg:items-end">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.04em] text-[#ff385c]">
          신당동 동네 큐레이션
        </p>
        <h1 className="mt-3 text-[40px] font-bold leading-[1.08] tracking-[-0.02em] text-[#222222] sm:text-[56px] lg:text-[64px]">
          어디가신당
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 tracking-[-0.009em] text-[#6a6a6a] sm:text-lg">
          시장의 온기, 골목의 빛, 오래 앉아 있고 싶은 작은 공간을 모아
          신당동을 천천히 둘러보는 지도입니다.
        </p>
      </div>

      <div className="rounded-[20px] bg-white p-2 shadow-[rgba(0,0,0,0.02)_0_0_0_1px,rgba(0,0,0,0.04)_0_2px_6px_0,rgba(0,0,0,0.1)_0_4px_8px_0]">
        <div className="grid gap-1 sm:grid-cols-[1fr_1fr_1fr_44px] sm:items-center">
          {[
            ["Where", "신당동"],
            ["Mood", "혼밥 · 산책 · 카페"],
            ["When", "오늘 가볍게"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-[14px] px-4 py-3 transition-colors hover:bg-[#f7f7f7]"
            >
              <div className="text-xs font-semibold text-[#222222]">
                {label}
              </div>
              <div className="mt-1 truncate text-sm text-[#6a6a6a]">
                {value}
              </div>
            </div>
          ))}
          <button
            type="button"
            aria-label="검색"
            className="flex h-11 w-full items-center justify-center rounded-full bg-[#ff385c] text-lg font-bold text-white transition-colors hover:bg-[#e00b41] sm:w-11"
          >
            ⌕
          </button>
        </div>
      </div>

      <nav
        aria-label="카테고리"
        className="flex gap-2 overflow-x-auto pb-1 lg:col-span-2"
      >
        {Object.entries(CATEGORY_LABELS).map(([category, label]) => (
          <span
            key={category}
            className={`shrink-0 rounded-lg border px-3 py-2 text-sm font-medium ${categoryStyles[category as Place["category"]]}`}
          >
            {label}
          </span>
        ))}
      </nav>
    </div>
  );
}

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2 className="text-[22px] font-semibold leading-[1.23] tracking-[-0.2px] text-[#222222]">
        {title} <span aria-hidden="true">→</span>
      </h2>
      <p className="mt-1 text-sm leading-6 text-[#6a6a6a]">{description}</p>
    </div>
  );
}

function MapPreview({
  pins,
  selectedPlace,
}: {
  pins: Pin[];
  selectedPlace: Place;
}) {
  return (
    <aside className="sticky top-20 h-fit rounded-[20px] bg-white p-3 shadow-[rgba(0,0,0,0.02)_0_0_0_1px,rgba(0,0,0,0.04)_0_2px_6px_0,rgba(0,0,0,0.1)_0_4px_8px_0]">
      <div className="relative min-h-[420px] overflow-hidden rounded-[18px] bg-[#f7f7f7]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(34,34,34,0.06)_1px,transparent_1px),linear-gradient(0deg,rgba(34,34,34,0.06)_1px,transparent_1px)] bg-[size:58px_58px]" />
        <div className="absolute left-[-10%] top-[34%] h-16 w-[125%] rotate-[-12deg] rounded-full bg-white/80" />
        <div className="absolute left-[26%] top-[-8%] h-[120%] w-14 rotate-[18deg] rounded-full bg-white/70" />
        <div className="absolute left-[8%] top-[18%] h-20 w-36 rounded-full border border-[#ebebeb] bg-white/60" />

        {pins.map((pin, index) => (
          <MapPin key={pin.id} pin={pin} index={index} />
        ))}

        <div className="absolute inset-x-3 bottom-3 rounded-[14px] bg-white p-4 shadow-[rgba(0,0,0,0.02)_0_0_0_1px,rgba(0,0,0,0.16)_0_2px_4px_0]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold tracking-[0.04em] text-[#ff385c]">
                지도 프리뷰
              </p>
              <h3 className="mt-1 text-sm font-semibold text-[#222222]">
                {selectedPlace.title}
              </h3>
            </div>
            <span className="rounded bg-[#f7f7f7] px-2 py-1 text-[11px] font-semibold text-[#222222]">
              {CATEGORY_LABELS[selectedPlace.category]}
            </span>
          </div>
          <p className="mt-2 text-xs leading-5 text-[#6a6a6a]">
            {selectedPlace.address}
          </p>
        </div>
      </div>
    </aside>
  );
}

function MapPin({ pin, index }: { pin: Pin; index: number }) {
  const positions = [
    "left-[54%] top-[42%]",
    "left-[40%] top-[36%]",
    "left-[29%] top-[52%]",
    "left-[66%] top-[58%]",
    "left-[49%] top-[68%]",
    "left-[72%] top-[30%]",
  ];

  return (
    <div
      className={`absolute ${positions[index % positions.length]} flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1`}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff385c] text-xs font-bold text-white shadow-[rgba(0,0,0,0.02)_0_0_0_1px,rgba(0,0,0,0.16)_0_2px_4px_0]">
        {CATEGORY_LABELS[pin.category].slice(0, 1)}
      </div>
      <span className="max-w-24 truncate rounded bg-white px-2 py-1 text-[11px] font-semibold text-[#222222] shadow-[rgba(0,0,0,0.08)_0_1px_3px]">
        {pin.title}
      </span>
    </div>
  );
}

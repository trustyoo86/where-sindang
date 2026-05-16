import type { Place } from "@/lib/notion/types";
import type { Pin } from "@/lib/map/provider";
import { CATEGORY_LABELS } from "@/lib/notion/types";

const places: Place[] = [
  {
    id: "place-001",
    slug: "central-market-noodle",
    title: "중앙시장 칼국수집",
    category: "food",
    lat: 37.5662,
    lng: 127.0198,
    address: "서울 중구 퇴계로85길",
    summary: "비 오는 날 생각나는 손칼국수와 겉절이의 단정한 조합.",
    cover: { url: "warm-table", alt: "따뜻한 국수 한 그릇" },
    tags: ["노포", "혼밥", "점심"],
    status: "published",
    updatedAt: "2026-05-16T00:00:00.000Z",
  },
  {
    id: "place-002",
    slug: "sindang-roastery",
    title: "신당 로스터리",
    category: "cafe",
    lat: 37.5653,
    lng: 127.0169,
    address: "서울 중구 다산로",
    summary: "골목 안쪽에서 볶는 원두 향과 낮은 음악이 오래 남는 카페.",
    cover: { url: "coffee-light", alt: "햇빛이 들어오는 커피 바" },
    tags: ["로스터리", "작업", "디저트"],
    status: "published",
    updatedAt: "2026-05-16T00:00:00.000Z",
  },
  {
    id: "place-003",
    slug: "small-stage-sindang",
    title: "소극장 신당",
    category: "culture",
    lat: 37.5671,
    lng: 127.0148,
    address: "서울 중구 난계로",
    summary: "주말 저녁의 독립 공연과 전시 소식이 모이는 작은 무대.",
    cover: { url: "gallery-room", alt: "작은 전시 공간" },
    tags: ["공연", "전시", "주말"],
    status: "published",
    updatedAt: "2026-05-16T00:00:00.000Z",
  },
  {
    id: "place-004",
    slug: "yellow-stair-alley",
    title: "노란 계단 골목",
    category: "place",
    lat: 37.5644,
    lng: 127.0216,
    address: "서울 중구 신당동 골목",
    summary: "낮게 이어지는 주택가와 시장 소리가 만나는 산책 코스.",
    cover: { url: "alley-sun", alt: "오후 햇살이 드는 골목" },
    tags: ["산책", "사진", "골목"],
    status: "published",
    updatedAt: "2026-05-16T00:00:00.000Z",
  },
  {
    id: "place-005",
    slug: "late-night-dumpling",
    title: "밤만두",
    category: "food",
    lat: 37.5637,
    lng: 127.0184,
    address: "서울 중구 청구로",
    summary: "늦은 시간에도 불이 켜져 있는 찐만두와 맑은 국물.",
    cover: { url: "night-kitchen", alt: "밤의 작은 식당" },
    tags: ["야식", "포장", "만두"],
    status: "published",
    updatedAt: "2026-05-16T00:00:00.000Z",
  },
  {
    id: "place-006",
    slug: "quiet-yard-cafe",
    title: "조용한 마당",
    category: "cafe",
    lat: 37.568,
    lng: 127.0207,
    address: "서울 중구 동호로",
    summary: "작은 마당석에 앉아 신당의 오후를 천천히 보는 곳.",
    cover: { url: "yard-cafe", alt: "작은 마당이 있는 카페" },
    tags: ["마당", "커피", "대화"],
    status: "published",
    updatedAt: "2026-05-16T00:00:00.000Z",
  },
];

const categoryStyles: Record<Place["category"], string> = {
  food: "border-[#ff385c] bg-white text-[#222222]",
  cafe: "border-[#222222] bg-[#f7f7f7] text-[#222222]",
  culture: "border-[#6a6a6a] bg-white text-[#222222]",
  place: "border-[#dddddd] bg-[#222222] text-white",
};

const imageStyles: Record<string, string> = {
  "warm-table":
    "bg-[radial-gradient(circle_at_28%_24%,#fff4e7_0_12%,transparent_13%),linear-gradient(135deg,#8f3e28_0%,#e6a36f_42%,#fff0df_100%)]",
  "coffee-light":
    "bg-[radial-gradient(circle_at_70%_22%,#ffffff_0_10%,transparent_11%),linear-gradient(135deg,#6f4b32_0%,#c99c74_48%,#f6e7d8_100%)]",
  "gallery-room":
    "bg-[linear-gradient(90deg,rgba(255,255,255,.55)_0_18%,transparent_19%),linear-gradient(135deg,#d9d9d9_0%,#ffffff_45%,#c7b8a7_100%)]",
  "alley-sun":
    "bg-[radial-gradient(circle_at_75%_20%,#fff0a8_0_13%,transparent_14%),linear-gradient(135deg,#d7d0bd_0%,#9da897_52%,#f2d28c_100%)]",
  "night-kitchen":
    "bg-[radial-gradient(circle_at_66%_28%,#ffd3a3_0_10%,transparent_11%),linear-gradient(135deg,#241f1d_0%,#7a3f2b_50%,#c07849_100%)]",
  "yard-cafe":
    "bg-[radial-gradient(circle_at_24%_78%,#6f8c65_0_16%,transparent_17%),linear-gradient(135deg,#efe6d5_0%,#ffffff_42%,#b7c0a4_100%)]",
};

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
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {places.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
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

function PlaceCard({ place }: { place: Place }) {
  return (
    <article className="group">
      <div
        className={`relative aspect-[1.05] overflow-hidden rounded-[20px] bg-[#dddddd] ${imageStyles[place.cover?.url ?? "warm-table"]}`}
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

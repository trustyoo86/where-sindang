// Map provider abstraction.
// Phase 1 ships KakaoMapProvider only; Google Maps and other providers can be
// added later by implementing the same MapProvider interface.
// Concrete adapter implementation is deferred until external API keys are
// provisioned (e.g. NEXT_PUBLIC_KAKAO_MAP_KEY in .env.local).

import type { Category } from "@/lib/notion/types";

export interface Pin {
  id: string;
  lat: number;
  lng: number;
  category: Category;
  title: string;
}

export interface MountOpts {
  center: { lat: number; lng: number };
  zoom?: number;
  pins?: Pin[];
}

export interface MapHandle {
  setPins(pins: Pin[]): void;
  panTo(lat: number, lng: number, zoom?: number): void;
  destroy(): void;
}

export interface MapProvider {
  mount(el: HTMLElement, opts: MountOpts): MapHandle;
}

export const CATEGORIES = ["food", "cafe", "culture", "place"] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  food: "음식",
  cafe: "카페",
  culture: "문화",
  place: "공간·골목",
};

export type PlaceStatus = "draft" | "published";

export interface PlaceImage {
  url: string;
  alt?: string;
}

export interface Place {
  id: string;
  slug: string;
  title: string;
  category: Category;
  lat: number;
  lng: number;
  address: string;
  summary: string;
  cover?: PlaceImage;
  gallery?: PlaceImage[];
  tags: string[];
  igUrl?: string;
  status: PlaceStatus;
  updatedAt: string;
}

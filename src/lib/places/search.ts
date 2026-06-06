import type { Place } from "@/lib/notion/types";
import { places } from "@/lib/places/data";

/** 검색어/제목 비교용 정규화: 소문자화 + 연속 공백 1칸 + 앞뒤 공백 제거. */
const normalize = (value: string): string =>
  value.toLowerCase().replace(/\s+/g, " ").trim();

/**
 * 공간 이름(place.title)으로 부분일치 검색한다.
 * - 빈 검색어/공백만 입력하면 원본 전체를 반환한다.
 * - 일치가 없으면 빈 배열을 반환한다.
 * - 원본 배열을 변형하지 않는 순수 함수.
 */
export function searchPlaces(
  query: string,
  list: Place[] = places,
): Place[] {
  const q = normalize(query);
  if (!q) return list;
  return list.filter((place) => normalize(place.title).includes(q));
}

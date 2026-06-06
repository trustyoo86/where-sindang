# 02 — 검색 함수 시그니처/계약 (search-engineer)

## 함수
```ts
searchPlaces(query: string, list?: Place[]): Place[]
```
- 위치: `src/lib/places/search.ts`
- 기본 `list`는 `places`(data.ts).

## 동작 계약 (search-ui는 이대로 호출)
- 정규화: 소문자 + 연속 공백 1칸 + trim.
- 매칭: `place.title` 부분일치(`includes`).
- 빈/공백 검색어 → 원본 전체 반환.
- 0건 → `[]`.
- 순수 함수(원본 불변).

## 테스트
- `src/lib/places/search.test.ts` — 빈/공백/부분일치/공백정규화/대소문자/0건/불변 7케이스.

## search-ui에게
`import { searchPlaces } from "@/lib/places/search"` 후 `searchPlaces(query)`만 호출하면 된다. 로직 재구현 금지.

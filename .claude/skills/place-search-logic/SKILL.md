---
name: place-search-logic
description: 어디가신당 공간 데이터를 이름으로 거르는 searchPlaces 검색 함수와 vitest 단위 테스트를 작성하는 매뉴얼. search-engineer가 검색 로직, 한글 부분일치, 정규화, 0건/빈 검색어 처리를 구현할 때 사용한다.
---

# place-search-logic — 검색 로직 작성 매뉴얼

## 트리거
공간 이름 검색의 **순수 로직**을 만들거나 고칠 때. (UI 연결은 `place-search-ui`)

## 작업 절차
1. `src/lib/places/data.ts`, `src/lib/notion/types.ts`, `artifacts/01-spec.md`를 읽는다.
2. `src/lib/places/search.ts`에 함수를 만든다:
   ```ts
   import type { Place } from "@/lib/notion/types";
   import { places } from "@/lib/places/data";

   const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();

   export function searchPlaces(query: string, list: Place[] = places): Place[] {
     const q = normalize(query);
     if (!q) return list;                       // 빈 검색어 → 전체
     return list.filter((p) => normalize(p.title).includes(q));
   }
   ```
3. `src/lib/places/search.test.ts`에 vitest 테스트를 만든다(아래 품질 체크의 케이스를 모두 덮을 것).
4. `artifacts/02-search.md`에 함수 시그니처와 동작 계약을 적는다.

## 출력 형식 (`artifacts/02-search.md`)
- 함수: `searchPlaces(query: string, list?: Place[]): Place[]`
- 매칭: `place.title` 부분일치, 정규화(소문자+공백 정리)
- 엣지: 빈/공백 검색어 → 전체, 0건 → `[]`
- 순수 함수(원본 불변)

## 품질 체크
- [ ] 빈 문자열·공백만 입력 → 전체 반환 테스트 있음
- [ ] 부분일치("로스터리") 테스트 있음
- [ ] 대소문자/공백 정규화 테스트 있음
- [ ] 0건 → `[]` 테스트 있음
- [ ] `yarn test` 그린
- [ ] UI/JSX/스타일 변경 없음

## 예외 상황
- 사양에 태그/초성이 없는데 요청이 모호하면 → 구현하지 말고 오케스트레이터에 질문.
- 기존 `getPlaceBySlug`와 충돌하지 않게 `search.ts`는 별도 파일로 둔다.

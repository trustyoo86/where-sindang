# 01 — 검색 사양 결정문

작성: place-search-orchestrator · 2026-06-06 · 초기 실행

## 목표
어디가신당 홈에서 **공간 이름으로 검색**. 입력하면 "오늘의 신당" 카드 목록이 실시간 필터링된다.

## 매칭 규칙 (확정)
- 대상: `place.title`(공간 명)**만**. tags/summary/address 제외.
- 방식: **부분일치**. `normalize(title).includes(normalize(query))`.
- 정규화: 소문자화 + 연속 공백 1칸 + 앞뒤 공백 제거. (초성 검색 없음)

## 엣지 케이스 (확정)
- 빈 검색어/공백만 → 원본 전체 표시.
- 결과 0건 → "검색 결과가 없어요" 안내 문구.
- 순수 함수: 원본 `places` 불변.

## 상태/URL
- 검색 상태는 `?q=` URL 쿼리에 동기화(공유 가능).

## 디자인
- `.claude/DESIGN.md`의 Search Bar / Circular Icon Button 규격 준수.
- #ff385c는 검색 버튼/활성 상태에만. radius는 4/8/14/20/32/50%만.

## 비범위 (이번 실행에서 하지 않음)
- 초성 검색, 태그/요약 검색, 카테고리 필터, 자동완성, 검색 history.

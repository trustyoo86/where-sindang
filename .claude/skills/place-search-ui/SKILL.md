---
name: place-search-ui
description: 어디가신당 홈의 검색 버튼을 실제 검색 입력+결과 필터링으로 연결하는 매뉴얼. search-ui가 searchPlaces를 호출해 카드 목록을 거르고, ?q= URL 상태와 0건 안내를 다루며, .claude/DESIGN.md Search Bar 규격을 따를 때 사용한다.
---

# place-search-ui — 검색 UI 작성 매뉴얼

## 트리거
검색 입력 UI와 결과 필터링을 붙이거나 고칠 때. (검색 로직은 `place-search-logic`)

## 작업 절차
1. **`.claude/DESIGN.md`를 먼저 읽는다** — Search Bar / Circular Icon Button 규격.
2. `artifacts/02-search.md`에서 `searchPlaces` 시그니처를 확인한다.
3. `src/app/page.tsx`의 죽은 ⌕ 버튼([page.tsx:79](../../src/app/page.tsx#L79))을 검색 입력과 연결한다.
   - 클라이언트 상호작용이 필요하므로 검색 입력+결과 그리드는 `"use client"` 컴포넌트로 분리한다.
   - `searchPlaces(query)` 결과로 "오늘의 신당" 카드 목록을 렌더한다.
   - `?q=` URL 동기화(`useSearchParams`/`useRouter`)로 검색 상태를 공유 가능하게.
4. 결과 0건 → 안내 문구(예: "검색 결과가 없어요"). 빈 검색어 → 전체 표시.
5. `artifacts/03-ui.md`에 변경 파일과 컴포넌트 구조를 적는다.

## 출력 형식 (`artifacts/03-ui.md`)
- 추가/변경 파일 목록
- 추가 컴포넌트(이름, client 여부, 받는 props)
- 상태/URL 처리 방식
- 0건/빈 검색어 UI 처리

## 품질 체크 (DESIGN.md 준수)
- [ ] 검색 pill: 흰 배경, 20px radius, `--shadow-subtle` 스택
- [ ] 검색 버튼: 40px 원형, #ff385c 배경 (브랜드 색은 여기/활성에만)
- [ ] border-radius는 4/8/14/20/32/50%만 사용
- [ ] 카드에는 그림자 없음
- [ ] 검색어 입력 시 이름 기준 필터 동작
- [ ] `searchPlaces` 로직을 컴포넌트에서 재구현하지 않음(호출만)

## 예외 상황
- 시그니처가 불명확하면 search-engineer에 확인 후 진행.
- 매칭 규칙을 바꾸고 싶으면 직접 고치지 말고 오케스트레이터를 거친다.

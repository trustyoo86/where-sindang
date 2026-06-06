---
name: place-search-orchestrator
description: 어디가신당 앱의 공간 이름 검색 기능을 만들거나 보완하는 전체 진행표(입구). "검색 추가/구현", "공간 이름으로 찾기", "검색 보완/수정/다시", "검색 UI만 다시", "결과 0건/빈 검색어 처리", "이전 검색 기능 기반 개선" 같은 요청에서 사용한다. 사양 결정 → 로직 → UI → 검증 순서로 search-engineer, search-ui, qa-verifier 팀을 조율한다.
---

# place-search-orchestrator — 전체 진행표 (팀장)

어디가신당 앱의 **공간 이름 검색** 작업을 묶는 입구 스킬이다. 직접 코드를 다 짜기보다, 사양을 못 박고 팀을 조율하고 사람 승인 게이트를 지킨다.

## 언제 이 스킬이 도는가
- 초기: "공간 이름으로 검색 추가/구현해줘".
- 후속: "검색 보완", "검색 다시", "UI만 다시", "결과 0건/빈 검색어 처리 확인", "이전 검색 기반 개선".

## 0단계 — 실행 모드 분기 (항상 먼저)
`artifacts/`와 `src/lib/places/search.ts` 존재를 확인한다.
- 둘 다 없음 → **초기 실행**.
- 있고 사용자가 일부만 가리킴("UI만", "로직만") → **부분 재실행**(해당 agent + qa-verifier만).
- 있지만 새 방향 → **새 실행**: 이전 산출물을 `artifacts/`에 보존한 뒤 진행.

## 1단계 — 사양 결정문
`artifacts/01-spec.md`에 못 박는다. 현재 확정 사양:
- 매칭 범위: `place.title`(공간 명)만.
- 한글 처리: 부분일치 + 정규화(소문자화, 공백 정리). 초성 검색 없음.
- 빈 검색어 → 전체 표시 / 결과 0건 → 안내 문구.

사용자가 "더 똑똑하게" 처럼 모호하게 말하면, 태그/초성 포함 여부를 **여기서 되묻고** 사양을 갱신한 뒤 진행한다.

## 2단계 — 팀 구성과 작업 등록
1. `TeamCreate`로 `search-engineer`, `search-ui`, `qa-verifier` 구성(부분 재실행이면 필요한 멤버만).
2. `TaskCreate`로 작업과 의존을 등록: ui는 engineer의 함수 시그니처에 의존.
3. 진행은 `TaskUpdate`로 갱신, 지연/막힘은 `TaskGet`으로 확인.

## 3단계 — 실행 흐름
1. `search-engineer` → `search.ts` + 테스트, `artifacts/02-search.md`에 시그니처.
2. 시그니처 확정 시 engineer가 `SendMessage`로 `search-ui`에 전달.
3. `search-ui` → 죽은 ⌕ 버튼을 검색으로 연결, `artifacts/03-ui.md`.
4. `qa-verifier`는 **점진 검증**: engineer 끝나면 테스트, ui 끝나면 통합+디자인. 실패는 즉시 반려.

## 4단계 — 검증 게이트
`qa-verifier`가 `artifacts/04-verification.md`에 정상/애매/실패 케이스 + `lint`/`test`/`build` 결과 + 디자인 준수를 적는다. 실패 항목이 있으면 해당 agent에 재시도, 통과까지 반복.

## 5단계 — 사람 승인 게이트
검증 통과 후 **커밋/PR은 자동으로 하지 않는다.** 변경 요약을 사람에게 보여주고 승인받은 뒤에만 커밋한다(얇은 하네스지만 머지는 사람 책임).

## 6단계 — 정리와 기록
`TeamDelete`로 팀 정리. `artifacts/improvement-log.md`에 날짜·변경·대상·사유를 남긴다.

## 산출물 계약
- `artifacts/01-spec.md`(사양), `02-search.md`(시그니처), `03-ui.md`(UI 변경), `04-verification.md`(검증), `improvement-log.md`(개선).
- 중간 결과를 대화에만 남기지 않는다. 다음 실행이 읽을 것은 파일로 남긴다.

## 참고
- 팀 규모는 작게(3명). 한 멤버 Task는 3-6개 이내.
- 각 멤버의 작업법은 `place-search-logic`, `place-search-ui`, `place-search-verify` 스킬에 있다.

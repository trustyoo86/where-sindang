# 프로젝트 안내판 — 어디가신당

신당동 공간 큐레이션 Next.js(App Router) 앱. 공간 데이터는 `src/lib/places/data.ts`에 정적으로 있고, 타입은 `src/lib/notion/types.ts`의 `Place`.

## 디자인
UI/스타일 변경 전에는 `.claude/DESIGN.md`(Airbnb 스타일)를 먼저 읽는다. 자세한 규칙은 `AGENTS.md` 참고.

## 하네스: place-search (공간 이름 검색)
공간 **이름으로 검색**하는 기능은 `place-search` 하네스로 처리한다.

**자연어 라우팅** — 스킬명을 직접 말하지 않아도, 아래 같은 요청이면 먼저 `place-search-orchestrator` 스킬을 쓴다:
- "공간 이름으로 검색 추가/구현해줘"
- "검색 보완/수정/다시 해줘", "검색 UI만 다시"
- "검색 결과 0건/빈 검색어 처리 확인해줘"
- "이전 검색 기능 기반으로 개선해줘"

직접 호출: `/place-search-orchestrator`

**구성 요소**
- Agent: `search-engineer`(검색 로직+테스트), `search-ui`(DESIGN.md 준수 검색 UI), `qa-verifier`(경계 교차 검증) — `.claude/agents/`
- Skill: `place-search-orchestrator`(입구), `place-search-logic`, `place-search-ui`, `place-search-verify` — `.claude/skills/`
- 산출물: `artifacts/`(사양·시그니처·UI메모·검증·개선로그). 지도는 `artifacts/README.md`.

**규칙**: 검색 로직은 `search-engineer`만 만들고 `search-ui`는 호출만 한다. `qa-verifier`는 작성과 분리된 레인에서 검증한다. 커밋/PR은 검증 통과 후 **사람 승인**을 받고 한다.

## 명령
- 빌드 `yarn build` · 테스트 `yarn test` · 린트 `yarn lint`

## 변경 이력
- 2026-06-06: place-search 하네스 신규 구축. 상세는 `artifacts/improvement-log.md`.

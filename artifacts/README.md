# artifacts — place-search 산출물 지도

이 폴더는 `place-search` 하네스가 남기는 결정·검증·개선 기록의 보관소다.
중간 결과를 대화에만 남기지 않고, **다음 실행이 읽을 것**을 파일로 남긴다.

## 무엇이 어디에 있는가
| 파일 | 누가 만드나 | 내용 | 다음 단계가 읽는 이유 |
| --- | --- | --- | --- |
| `01-spec.md` | orchestrator | 검색 사양 결정(매칭 범위·한글 처리·엣지) | engineer/ui가 동일 사양으로 작업 |
| `02-search.md` | search-engineer | `searchPlaces` 시그니처와 동작 계약 | ui가 함수를 정확히 호출 |
| `03-ui.md` | search-ui | 변경 파일·컴포넌트·상태/URL 처리 | verifier가 통합 지점 파악 |
| `04-verification.md` | qa-verifier | 케이스별 통과/실패 + 명령 결과 + 디자인 점검 | 사람 승인 판단 근거 |
| `improvement-log.md` | orchestrator | 날짜·변경·대상·사유 | 다음번 하네스 개선 근거 |

## 실행 모드
- **초기 실행**: 이 폴더에 산출물이 거의 없을 때 — 01→04 전체 생성.
- **부분 재실행**: "UI만 다시" 등 — 해당 산출물 + `04` 갱신.
- **새 실행**: 방향이 바뀌면 이전 산출물 보존 후 새로 작성.

## 최종 산출물
코드: `src/lib/places/search.ts`(+테스트), 검색 UI 컴포넌트, `src/app/page.tsx` 연결.
이 폴더의 문서는 그 코드를 만든 **결정과 검증의 기록**이다.

## 입구
자연어로 "검색 추가/보완/다시"라고 하면 `place-search-orchestrator` 스킬이 입구다.

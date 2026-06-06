# 04 — 검증 리포트 (qa-verifier)

검증: 2026-06-06 · 초기 실행

## 명령 검증 (근거)
| 명령 | 결과 |
| --- | --- |
| `yarn test` | **PASS** — 2 files, 12 tests passed (search 7 + Modal 5) |
| `yarn lint` | **PASS** — eslint 클린(미사용 import 없음) |
| `yarn build` | **PASS** — 컴파일 + TypeScript + 정적 생성 10/10 성공 |

## 기능 케이스 (search.test.ts로 검증)
| 유형 | 입력 | 기대 | 결과 |
| --- | --- | --- | --- |
| 정상 | "로스터리" | "신당 로스터리"만 | PASS |
| 애매 | "  로스터리  " | 정규화 매칭 | PASS |
| 대소문자 | "ROASTERY" | 0건(title 영문 없음), 정규화 동작 | PASS |
| 실패하기 쉬움 | "" (빈 검색어) | 전체 6건 | PASS |
| 실패하기 쉬움 | "없는가게이름" | 0건 → 안내 문구 | PASS (로직 `[]`, UI 안내 분기) |
| 불변 | — | 원본 places 불변 | PASS |

## 경계 교차 검증 (로직 ↔ UI)
- `PlaceSearch`가 `searchPlaces(query)`를 호출만 함(로직 재구현 없음) — 02 계약 준수. ✅
- 빈 검색어 시 `searchPlaces`가 전체 반환 → UI가 전체 그리드 렌더. ✅
- 0건 시 로직 `[]` → UI `results.length === 0` 분기로 안내 문구. ✅
- `useSearchParams`를 `<Suspense>`로 감쌈 → build의 정적 생성 통과로 확인. ✅

## 디자인 검증 (DESIGN.md)
- 검색 pill: 흰 배경 + 20px radius + `--shadow-subtle` 3스택. ✅
- 검색 버튼: 40px 원형 + #ff385c(브랜드 색 검색 버튼에만). ✅
- radius 허용값(14/20/full)만 사용. ✅
- 카드 그림자 없음 유지. ✅

## 판정
**전체 PASS.** 사람 승인 게이트(커밋)로 넘긴다.

## 잔여/후속 후보 (이번 범위 아님)
- Hero의 장식용 검색 pill과 실제 검색바가 둘 다 보임 — 후속에서 통합 검토 가능.
- 디버운스/접근성(결과 수 aria-live) 등은 후속 보완 후보.

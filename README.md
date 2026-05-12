# Where-Sindang

서울 중구 **신당동** 일대의 음식점·카페·문화공간·골목/장소성을 **1인 큐레이션** 방식으로 소개하는 인스타그램 감성 동네 가이드 웹사이트.

> Status: Phase 1 (MVP, read-only public beta) — planning complete · implementation pending
> Plan: [`.omc/plans/2026-05-11-where-sindang-mvp.md`](./.omc/plans/2026-05-11-where-sindang-mvp.md)

---

## 1. 무엇을 만드나

- 신당동의 **음식 / 카페 / 문화 / 공간·골목** 4개 카테고리를 큐레이션
- **인스타그램 감성**의 카드 피드 + **카카오맵** 기반 핀/지도 탐색
- 콘텐츠는 운영자가 **Notion DB**에서 단독 작성 → 웹에 자동 반영
- 장기적으로는 누적된 콘텐츠 DB 기반 **LLM 추천 서비스**(Phase 4+)로 확장

## 2. 핵심 결정 사항

### 운영 모델
- **1인 에디터링(큐레이션 박지)** — 운영자가 단독 작성, 일반 사용자는 읽기·소셜 인터랙션만(단계별 도입)
- 콘텐츠 SSOT: **Notion DB `Places`**
- Obsidian Vault는 **Phase 4의 백업·아카이브 미러**(단방향: Notion → Markdown export)

### 기술 스택
| 영역 | 선택 | 비고 |
|------|------|------|
| 프레임워크 | **Next.js (App Router)** | SSR/ISR·SEO·이미지 최적화 성숙도 기준 |
| 호스팅 | **Vercel** | ISR·이미지 프록시·도메인 관리 통합 |
| 콘텐츠 | **Notion API** | 운영자 단일 입력 도구, ISR로 5분 내 반영 |
| 지도 | **카카오맵 (kakao.maps.sdk)** | 한국 골목 정확도 + 카카오 로그인과 일관 |
| 지도 추상화 | `MapProvider` 인터페이스 | Google Maps는 Phase 5+ 동일 인터페이스로 추가 |
| TanStack | **라이브러리 차원만 흡수** | Query/Form/Table은 Phase 2~3에서 활용. TanStack Start는 SSR 운영 사례 부족으로 메인 프레임워크 후보 제외 |

### 인증·소셜
| Phase | 추가 항목 |
|-------|----------|
| Phase 1 | **로그인 없음** — 콘텐츠·파이프라인 우선 검증 |
| Phase 2 | 카카오 로그인 + 좋아요/별점 + 북마크 |
| Phase 3 | 네이버 로그인 + 댓글/리뷰(모더레이션 큐) |
| Phase 4 | 메타(Facebook/Instagram) 로그인 + IG Graph API 본격 통합 |

### Instagram 연동
- Phase 1: **oEmbed 임베드만** (개별 IG 링크를 콘텐츠에 첨부)
- Phase 2 이후: Graph API 기반 운영자 피드 자동 표시 검토(Meta 정책 안정화 시점 기준)

### 사용자 인터랙션 도입 순서 (난이도 ↑)
1. 외부 공유 (Web Share API + Kakao Link) — Phase 1
2. 좋아요 / 별점 — Phase 2
3. 북마크 / 컬렉션 — Phase 2
4. 댓글 / 리뷰 — Phase 3

## 3. Phase Roadmap

| Phase | 범위 | 출시 신호 |
|-------|------|-----------|
| **Phase 1 (MVP)** | Notion → 웹 렌더링 + 카카오맵 + 카테고리 필터 + 외부 공유 | 시드 30~50개, Lighthouse Mobile 85+, SEO 메타 |
| Phase 2 | 카카오 로그인 + 좋아요/북마크 + IG oEmbed + 검색 + i18n 골격 | 인터랙션 사용자 N≥50 |
| Phase 3 | 네이버 로그인 + 댓글/리뷰 | 모더레이션 SLA 정의 |
| Phase 4 | 메타 로그인 + IG Graph API + Obsidian 자동 sync + LLM 추천 베타 | 추천 정확도 정성 평가 ≥ "유용" 70% |

## 4. 아키텍처 (Phase 1)

```
Notion DB "Places"  ──Notion API──▶  Next.js App Router (Vercel)
  (운영자 단독 편집)                    │
                                       ├─ ISR(5분) + on-demand revalidate webhook
                                       ├─ MapProvider 추상화 → KakaoMapProvider
                                       └─ next/image + Notion 이미지 프록시(/api/img)
                                                │
                                                ▼
                                          Browser
                                       ├─ 카드 피드 / 카테고리 페이지 / 상세
                                       └─ 전체 지도(클러스터링 + bottom sheet)
```

상세 시스템 다이어그램·DB 스키마·Frontmatter 표준은 [plan §5](./.omc/plans/2026-05-11-where-sindang-mvp.md#5-system-architecture-phase-1) 참고.

## 5. Notion DB 스키마 요약

| Property | Type | Notes |
|----------|------|-------|
| `title` | Title | URL slug 자동 생성 |
| `slug` | Rich text | 비어있으면 title에서 자동 |
| `category` | Select | `food` / `cafe` / `culture` / `place` |
| `lat`, `lng` | Number | 카카오맵 좌표 |
| `address` | Rich text | 표시·딥링크 |
| `summary`, `cover`, `gallery`, `tags` | Mixed | 카드·상세 페이지용 |
| `ig_url` | URL | Phase 2 oEmbed |
| `status` | Status | `draft` / `published` (웹은 published만) |
| `updated_at` | Last edited time | 캐시·정렬 |

## 6. Repository Layout (예정)

```
where-sindang/
├── README.md                     # ← 이 파일
├── .omc/
│   └── plans/
│       └── 2026-05-11-where-sindang-mvp.md   # 정식 work plan
├── src/
│   ├── app/                      # Next.js App Router
│   ├── lib/
│   │   ├── notion/               # Notion API 어댑터
│   │   └── map/                  # MapProvider 추상화 + Kakao 구현
│   └── components/
└── (이후 추가 예정)
```

## 7. 주요 리스크 (요약)

| Risk | Mitigation |
|------|-----------|
| Notion 이미지 URL 만료 | `/api/img` 프록시 + edge cache |
| 콘텐츠 권리(가게 사진·상호) 분쟁 | 사전 동의 + 출처 표기 + "삭제 요청" SOP(48h) |
| 가게 폐업/이전 정보 오류 | `updated_at` 30일 초과 자동 플래그 |
| 카카오 인앱 브라우저 호환 | QA 체크리스트 + URL 복사 폴백 |

전체 8개 리스크는 [plan §7](./.omc/plans/2026-05-11-where-sindang-mvp.md#7-risks--mitigations) 참고.

## 8. 다음 액션 (Phase 1 Step 0)

운영자 직접 수행이 효율적인 비코드 작업 우선:

1. 도메인 후보 확정(예: `where-sindang.kr`) 및 등록
2. 카카오 디벨로퍼스 앱 생성 + JS 키 발급 + 도메인 등록
3. Notion `Places` DB 생성 + Internal Integration 토큰 발급
4. Vercel 프로젝트 생성 + 환경변수 등록
   - `NOTION_TOKEN`, `NOTION_DB_ID`, `KAKAO_MAP_KEY`, `NEXT_PUBLIC_BASE_URL`

이후 Step 1~7(Next.js 골격 → Notion 어댑터 → 라우트 → 지도 → 필터/공유/SEO → Webhook/Admin → 시드/QA/런칭)은 plan §6 참고.

## 9. Getting Started (로컬 개발)

기본 스캐폴드(Next.js 16 + React 19 + Tailwind v4 + TypeScript)가 적용되어 있습니다.

```bash
npm install                          # 최초 1회
cp .env.local.example .env.local     # 외부 키는 비어 있어도 빌드 통과
npm run dev                          # http://localhost:3000
npm run lint
npm run build
```

기본 폴더 구조:

```
src/
├── app/                  # App Router (layout, page, globals.css)
├── components/           # SiteHeader, MobileTabBar
└── lib/
    ├── notion/types.ts   # Place 도메인 타입 + CATEGORIES
    └── map/provider.ts   # MapProvider 인터페이스 (구현은 Phase 1 Step 4)
```

외부 서비스 키(Kakao Map, Notion API)는 본 단계에 포함되지 않습니다. plan §6 Step 0 참고.

## 10. License & 권리

- 콘텐츠(글·사진)의 권리는 운영자 또는 각 가게에 귀속.
- 가게 사진·상호 사용은 사전 동의 원칙. 비공개 요청은 48시간 이내 반영.
- 코드 라이선스는 Phase 1 런칭 전 결정.

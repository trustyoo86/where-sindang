---
title: Where-Sindang — 신당동 동네 큐레이션 웹사이트 MVP
created: 2026-05-11
phase: 1 (read-only public beta)
owner: ian
status: draft
---

# Where-Sindang — 신당동 동네 큐레이션 웹사이트

## 0. Requirements Summary

서울 중구 신당동 일대의 음식점·카페·문화공간·골목/장소성을 **1인 큐레이션(에디터링)** 방식으로 소개하는 인스타그램 감성 웹사이트.

- **콘텐츠 SSOT**: Notion DB. Obsidian Vault는 백업·아카이브 미러(단방향: Notion → Markdown export).
- **운영 모델**: 운영자(ian)가 단독 작성. 일반 사용자는 읽기/소셜 인터랙션만(단계별 도입).
- **지도**: 카카오맵(1차), 추후 Google Maps 확장 가능한 provider abstraction.
- **로그인**: 카카오 → 네이버 → 메타(IG) 단계 도입. **Phase 1에서는 로그인 없음**.
- **Instagram 연동**: Phase 1은 oEmbed 임베드만, Phase 2 이후 Graph API 본격 통합 검토.
- **장기 비전(Phase 4+)**: 누적된 콘텐츠 DB를 활용한 키워드/프롬프트 기반 LLM 추천 서비스.

## 1. Phase Roadmap

| Phase | 범위 | 출시 신호 |
|-------|------|-----------|
| **Phase 1 (MVP, 본 plan의 주력 범위)** | 읽기 전용 공개 베타: Notion DB → 웹 렌더링 + 카카오맵 + 카테고리 필터 + 외부 공유(Kakao Link / Web Share API) | 신당동 시드 콘텐츠 30~50개, 도메인 연결, Lighthouse Mobile 85+, SEO 메타 |
| **Phase 2** | 카카오 로그인 + 좋아요/별점 + 북마크/컬렉션, IG oEmbed 임베드, 검색(풀텍스트), i18n 골격(ko 기본) | 좋아요·북마크 사용자 N≥50 |
| **Phase 3** | 네이버 로그인 + 댓글/리뷰(모더레이션 큐) | 댓글 모더레이션 SLA 정의 |
| **Phase 4** | 메타(IG) 로그인 + IG Graph API 본격 통합 + Obsidian Vault 자동 sync(GitHub Actions 등) + LLM 추천 베타 | 추천 정확도 사용자 정성 평가 ≥ "유용" 70% |

본 plan의 **Implementation Steps**는 Phase 1에 집중하며, Phase 2~4는 "아키텍처 확장 지점"으로만 명시합니다.

## 2. Acceptance Criteria (Phase 1)

### 콘텐츠 & 데이터
- [ ] Notion DB 한 곳(예: `Places`)에서 콘텐츠 작성 → 웹 사이트에 표시까지 운영자 손이 닿는 곳은 **Notion만**.
- [ ] 콘텐츠 갱신 시 웹 반영 latency: ISR revalidate ≤ 5분 (수동 webhook 트리거 시 ≤ 30초).
- [ ] 시드 콘텐츠 30개 이상 배포 시점에 모든 항목이 `category`, `lat`, `lng`, `address`, `summary`, `cover`, `gallery[]`, `tags[]`, `status(published/draft)` 필드를 갖춤.
- [ ] 카테고리 4종(`food` / `cafe` / `culture` / `place`)이 핀 디자인·필터 칩·SEO 카테고리 페이지 3곳에서 일관되게 매핑됨.

### UX & UI
- [ ] **모바일 우선**(viewport 390px 기준 핵심 화면 깨짐 없음). 데스크탑은 1024px+ 2-pane(좌: 리스트, 우: 지도).
- [ ] 핀 디자인은 카테고리별 색상·아이콘 구분 + 클러스터링(줌아웃 시).
- [ ] 핀 클릭 → bottom sheet(모바일) / 우측 카드(데스크탑)로 미리보기 + 상세 페이지 진입.
- [ ] 카테고리 필터 칩 다중 선택 가능. 필터 상태는 URL query에 직렬화.
- [ ] 외부 공유: Web Share API 시도 → 미지원 시 Kakao Link fallback → 최종 폴백은 URL 복사.

### 성능 & SEO
- [ ] Lighthouse Mobile 점수: Performance ≥ 85, Accessibility ≥ 90, SEO ≥ 95.
- [ ] 모든 콘텐츠 페이지에 OG 태그(이미지·제목·설명·위치), JSON-LD `LocalBusiness` 또는 `Place` 스키마.
- [ ] sitemap.xml + robots.txt 자동 생성. 인덱싱 가능 페이지: 홈, 카테고리 4종, 콘텐츠 상세 N개.

### 운영
- [ ] 도메인(예: where-sindang.kr) 연결 + HTTPS.
- [ ] Vercel(또는 동등) 환경에 환경변수 분리: `NOTION_TOKEN`, `NOTION_DB_ID`, `KAKAO_MAP_KEY`, `NEXT_PUBLIC_BASE_URL`.
- [ ] 운영자용 비공개 admin 페이지(인증 없이 obscure path, 또는 simple basic-auth) — Notion 상태 확인·캐시 무효화 트리거.

### 비고정 항목(MVP 제외, Phase 2+에서 등장)
- 로그인, 좋아요, 북마크, 댓글, 검색, i18n, IG 본격 연동, LLM 추천.

## 3. Decision Drivers (요약)

| Driver | 결정 | Why |
|--------|------|-----|
| 운영 모델 | 1인 큐레이션, Notion SSOT | 운영자 단일 작가, Notion이 작성 UX·DB 양쪽에서 가장 친숙 |
| Phase 1 인증 | 없음 | 콘텐츠·파이프라인 우선 검증, 인증 도입 시점 사용자 신호 기반 결정 |
| 지도 | 카카오맵 (provider abstraction) | 한국 골목 정확도, 카카오 로그인과 일관, Google 확장 여지 보존 |
| 콘텐츠 동기화 | Notion API + ISR | 운영자가 푸시 절차 불필요, 캐시로 비용 통제 |
| 프레임워크 | Next.js (App Router) | SSR/ISR·SEO·이미지 최적화 성숙, agent 스킬셋 적합도 최고 |
| TanStack 활용 | 라이브러리 차원으로 흡수 | TanStack Start는 베타 안정성·SSR 운영 사례 부족, Query·Form·Table은 Next.js와 호환 |

## 4. RFC: TanStack vs Next.js (사용자 요청 검토)

**검토 결과 — Next.js (App Router) 채택, TanStack은 라이브러리 차원에서 활용 권장.**

| 항목 | TanStack Start | Next.js (App Router) |
|------|----------------|----------------------|
| 성숙도 (2026-05 기준) | 상대적으로 신생, SSR·ISR 운영 패턴 사례 적음 | 수년간 production-grade, 한국·해외 사례 다수 |
| SEO·SSR·ISR | 가능하나 컨벤션·문서 부족 | 1st-class, 본 프로젝트의 콘텐츠 사이트 요구에 정합 |
| 이미지 최적화 | 별도 구성 필요 | `next/image` 기본 제공 |
| 배포 (Vercel) | 가능, 통합도 보통 | 우선 지원, 도메인·환경변수·로그 통합 매끄러움 |
| Notion + Kakao SDK 통합 | 직접 패턴 구축 필요 | 익숙한 패턴·예제 다수 |
| Agent(executor/designer) 적합도 | 낮음 | 높음 (nextjs skill 활용 가능) |

**대신 TanStack의 강점은 라이브러리로 흡수:**
- **TanStack Query**: 클라이언트 데이터 페칭·캐싱(Phase 2의 좋아요·북마크 클라이언트 상태에 활용).
- **TanStack Form** (선택): 댓글/리뷰 폼(Phase 3).
- **TanStack Table** (선택): 운영자용 admin 테이블.

**이 결정의 되돌릴 수 있는 정도**: 높음. 프론트 라이브러리는 Phase 1에 비중이 작아 추후 평가 후 일부 페이지를 TanStack Start로 옮기는 PoC도 가능.

## 5. System Architecture (Phase 1)

```
┌─────────────────────────────────────────────────────────────┐
│  Content Source of Truth                                    │
│  Notion DB "Places" (운영자만 편집)                          │
│   ├─ properties: title, category, lat, lng, address,        │
│   │   summary, tags, status, cover, gallery, ig_url,        │
│   │   updated_at                                            │
│   └─ page body: rich text + images + 임베드                  │
└──────────────────────────┬──────────────────────────────────┘
                           │  Notion API (server-side)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  Next.js App Router  (Vercel)                               │
│   - app/(public)/page.tsx           홈(피드+미니맵)          │
│   - app/(public)/map/page.tsx       전체 지도                │
│   - app/(public)/[category]/page.tsx  카테고리 페이지         │
│   - app/(public)/place/[slug]/page.tsx  콘텐츠 상세           │
│   - app/api/revalidate/route.ts     Notion webhook용         │
│   - app/admin/page.tsx              비공개 운영 패널          │
│  ISR: revalidate = 300s, on-demand via webhook              │
│  Map Provider Adapter: KakaoMapProvider | (later) GoogleMapProvider │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTML/JS (CDN)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  Browser                                                    │
│   - Kakao Map JS SDK (동적 로드)                              │
│   - 카테고리별 핀 + 클러스터                                  │
│   - bottom sheet / 우측 카드                                  │
└─────────────────────────────────────────────────────────────┘

(Out of Phase 1 — 점선)
┌ Obsidian Vault ◀── (Phase 4) Notion → Markdown export job ──┐
└ LLM 추천 서비스 ◀── (Phase 4) DB indexing + prompt pipeline ─┘
```

### 5.1 Notion DB 스키마(`Places`)

| Property | Type | Example | Notes |
|----------|------|---------|-------|
| `title` | Title | "○○수제비" | URL slug 자동 생성용 |
| `slug` | Rich text | "ssrs-sujebi" | 비어 있으면 title에서 자동 생성 |
| `category` | Select | `food` / `cafe` / `culture` / `place` | 핀·필터·SEO 매핑 |
| `lat`, `lng` | Number | 37.5651, 127.0107 | 카카오맵 입력 |
| `address` | Rich text | "서울 중구 다산로…" | 표시·딥링크 |
| `summary` | Rich text | "한 줄 인상" | 카드 미리보기 |
| `cover` | Files | image | OG 이미지·카드 썸네일 |
| `gallery` | Files (multi) | images | 상세 페이지 갤러리 |
| `tags` | Multi-select | "야장", "노포", "1인" | 필터 보조 |
| `ig_url` | URL | https://www.instagram.com/p/... | oEmbed(Phase 2) |
| `status` | Status | `draft` / `published` | 웹에는 published만 |
| `updated_at` | Last edited time | — | 캐시 헤더·정렬 |

### 5.2 Frontmatter 규약 (Obsidian export용 — Phase 4 준비)

Phase 4의 Notion → Markdown export job이 생성할 frontmatter 표준은 본 plan에서 미리 합의:

```yaml
---
id: <notion_page_id>
slug: ssrs-sujebi
title: ○○수제비
category: food
lat: 37.5651
lng: 127.0107
address: 서울 중구 다산로 ...
tags: [야장, 노포, 1인]
ig_url: https://www.instagram.com/p/...
status: published
updated_at: 2026-05-11T12:34:56Z
---
```

→ Phase 1에서는 export job을 만들지 않지만, Notion 속성명을 위 frontmatter에 1:1 매핑되도록 설계해 Phase 4 작업 비용을 최소화.

### 5.3 지도 Provider Abstraction

```ts
// src/map/provider.ts
export interface MapProvider {
  mount(el: HTMLElement, opts: MountOpts): MapHandle;
}
export interface MapHandle {
  setPins(pins: Pin[]): void;
  panTo(lat: number, lng: number, zoom?: number): void;
  destroy(): void;
}

export interface Pin {
  id: string;
  lat: number;
  lng: number;
  category: 'food' | 'cafe' | 'culture' | 'place';
  title: string;
}
```

Phase 1은 `KakaoMapProvider`만 구현, `GoogleMapProvider`는 Phase 5+에서 동일 인터페이스로 추가.

## 6. Implementation Steps (Phase 1)

### Step 0 — 사전 준비(반나절)
1. 도메인 결정 + Vercel 프로젝트 생성.
2. 카카오 디벨로퍼스: 앱 생성, JavaScript 키 발급, 도메인 등록.
3. Notion: `Places` DB 생성(위 스키마), Internal Integration 생성, DB 공유.
4. 환경변수 `.env.local` 정리.

### Step 1 — Next.js 골격 (1일)
1. `npx create-next-app@latest where-sindang --typescript --app --tailwind --eslint`.
2. 폴더 구조: `src/app/`, `src/lib/notion/`, `src/lib/map/`, `src/components/`.
3. 디자인 시스템 토큰(컬러·타이포·간격) Tailwind 설정에 잡기 — 신당동 톤(뉴트로/노포 감성)은 후속 designer agent 단계에서 디테일 결정.
4. 기본 레이아웃: 상단 글로벌 헤더, 모바일 하단 탭(피드/지도/about).

### Step 2 — Notion 어댑터 (1~2일)
1. `src/lib/notion/client.ts` — `@notionhq/client` 래핑, 토큰은 server-only 모듈.
2. `src/lib/notion/places.ts` — `listPublishedPlaces()`, `getPlaceBySlug(slug)`, `getPlaceById(id)`.
3. Notion API 응답을 도메인 타입 `Place`로 정규화(슬러그 결정·카테고리 enum 검증·좌표 number 변환).
4. **이미지 처리**: Notion `Files`는 만료되는 S3 URL → `next/image` `loader`에서 프록시 또는 빌드 시 다운로드 후 `public/og/` 저장. MVP는 ISR + 서버 프록시(`/api/img?notionUrl=...`) 채택. (만료 회피 결정 근거: 빌드 시 다운로드는 콘텐츠 갯수 증가 시 빌드 시간 폭증.)
5. ISR: 페이지 컴포넌트에 `export const revalidate = 300`.

### Step 3 — 콘텐츠 라우트 (1일)
1. `app/(public)/page.tsx` — 카드 피드(섹션: 최신, 카테고리별 추천 3개).
2. `app/(public)/[category]/page.tsx` — 카테고리 페이지. `generateStaticParams`로 4개 카테고리 pre-render.
3. `app/(public)/place/[slug]/page.tsx` — 상세 페이지. `generateMetadata`로 OG·JSON-LD 주입.
4. 404·로딩 경계.

### Step 4 — 지도 (2~3일)
1. `src/lib/map/provider.ts` — 인터페이스 정의(섹션 5.3).
2. `src/lib/map/kakao.ts` — `KakaoMapProvider` 구현. SDK는 `next/script` 동적 로드(`afterInteractive`).
3. `src/components/PlaceMap.tsx` — 클라이언트 컴포넌트. 핀 카테고리별 아이콘(공통 SVG sprite + 카테고리 색상).
4. 클러스터러 적용(카카오 `MarkerClusterer`).
5. `app/(public)/map/page.tsx` — 전체 지도 + 좌측(데스크탑) / 하단 시트(모바일) 결과 리스트, URL `?category=food,cafe` 동기화.
6. 핀 클릭 → bottom sheet 미리보기 → 상세 페이지 라우팅.

### Step 5 — 필터·공유·SEO (1~2일)
1. 카테고리 필터 칩 컴포넌트(다중 선택, URL query 직렬화).
2. 공유 버튼(Web Share API + Kakao Link 폴백 + 복사).
3. `sitemap.ts`, `robots.ts` 생성.
4. JSON-LD `Place` 스키마 주입.
5. 디자인 다듬기(designer agent 위임 권장).

### Step 6 — Webhook & Admin (1일)
1. `app/api/revalidate/route.ts` — Notion 변경 시 외부 트리거(예: Notion → Make.com → POST). 시크릿 헤더 검증.
2. `app/admin/page.tsx` — 운영자용 비공개 패널. obscure URL + 환경변수 토큰 헤더 검증(Phase 1엔 정식 인증 생략). 캐시 무효화 버튼, 발행 상태 헬스 체크.

### Step 7 — 시드 콘텐츠·QA·런칭 (2~3일)
1. Notion에 신당동 시드 30개 작성(운영자 작업).
2. Lighthouse Mobile 점수 확인 및 튜닝.
3. 모바일 실기기 QA(iOS Safari·Android Chrome, 카카오 인앱 브라우저 포함).
4. 도메인 연결·HTTPS·OG 미리보기 확인.
5. 비공개 베타 안내.

**예상 일정 합계**: 약 2.5~3주 (1인 풀타임 기준, 디자인 디테일·시드 콘텐츠 작성 포함).

## 7. Risks & Mitigations

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|-----------|--------|------------|
| R1 | Notion 이미지 URL 만료 → 깨진 이미지 | 높음 | 중 | `/api/img` 프록시 + edge cache; 추후 빌드 시 다운로드/Cloudinary 검토 |
| R2 | 카카오맵 SDK 일일 호출 한도 초과 | 낮음 | 중 | 무료 한도 300k/day 충분, 사용량 모니터링 알람 설정 |
| R3 | Notion API rate limit (3 req/s) → 빌드/ISR 실패 | 중 | 중 | 서버 측 쿼리 캐시 + ISR로 자연 분산, 빌드 시 retry |
| R4 | 콘텐츠 권리(가게 사진·상호) 분쟁 | 중 | 높음 | 각 가게 사전 동의 + 출처 표기 + 요청 시 24h 내 비공개화 SOP, "삭제 요청" 페이지 |
| R5 | 신당동 가게 폐업/이전으로 정보 오류 | 높음(시간) | 중 | `updated_at` 30일 초과 콘텐츠 자동 플래그 + 운영자 알림 |
| R6 | 지도 provider 추상화 over-engineering | 중 | 낮음 | 인터페이스를 최소 3개 메서드로 제한, Google 어댑터는 실제 필요 시점까지 미루기 |
| R7 | 모바일 카카오 인앱 브라우저 호환 이슈(공유·외부 링크) | 중 | 중 | QA 항목에 명시, 폴백 URL 복사 UX 보장 |
| R8 | 운영자 단독 → 콘텐츠 갱신 지연 → 신뢰도 하락 | 중 | 중 | Phase 1은 30~50개 timeless 콘텐츠 위주, "최근 업데이트" 노출로 갱신 신호 강조 |

## 8. Verification Steps

| 항목 | 방법 | 도구 |
|------|------|------|
| Notion → 웹 반영 | Notion에서 `status` published 변경 → ≤ 5분 내 노출, webhook 트리거 시 ≤ 30초 | 수동 + 타이머 |
| 카테고리 일관성 | 4개 카테고리 각 페이지·필터·핀 색이 동일한 enum 사용 | 코드 검토(`grep`) + 시각 검수 |
| 모바일 레이아웃 | 390px viewport에서 핵심 화면 깨짐 없음 | Chrome DevTools + 실기기 |
| 성능 | Lighthouse Mobile Performance ≥ 85 | Lighthouse CI on Vercel preview |
| SEO 메타 | OG 미리보기 카드 정상, JSON-LD 유효 | Facebook Sharing Debugger, Google Rich Results Test |
| 지도 핀 | 모든 published place가 핀으로 표시·클릭 → 상세 진입 | 수동 시드 30개 전수 |
| 공유 | iOS Safari/Android Chrome/카카오 인앱에서 공유 동작 | 실기기 QA 체크리스트 |
| 권리 SOP | "삭제 요청" 페이지에서 폼 제출 → 48h 내 운영자 수신 확인 | 메일 트랙 + 운영 일지 |

## 9. Expansion Hooks (Phase 2~4 준비)

- **Phase 2 이전에 마련해 둘 것**: `MapProvider` 인터페이스 / 카테고리 enum / Notion 속성명 / `Place` 도메인 타입 / Frontmatter 표준(섹션 5.2) / `updated_at` 기록.
- **Phase 4 LLM 추천 사전 작업 가설**: Notion DB의 `tags`·`summary`·`category`·좌표·`updated_at`을 임베딩 인덱스로 변환 → 사용자 키워드/현 위치 기반 retrieval + 모델 답변. 이 단계에서 콘텐츠 양이 충분치 않으면 cold-start로 큐레이션 룰 우선.

## 10. Open Questions (계속 정리)

다음 항목은 plan을 확정 후 별도 의사결정으로 진행:

1. 도메인 후보(예: `where-sindang.kr` / `wheresindang.com` 등) 및 등록 시점.
2. 디자인 톤(뉴트로 vs 모던 미니멀 vs 매거진)·서체 — designer agent에 위임.
3. 카카오 비즈 채널 사용 여부(가게 정보 보강 — Phase 2+).
4. 분석(Plausible vs GA4 vs 자체 — 개인정보 관점).
5. 저장소 구조(monorepo? — 현재는 단일 Next.js app으로 충분).

---

## Appendix A — 참여자/도구 메모

- 개발: Claude Code(OMC) 보조, executor/designer/nextjs skill 활용 예정.
- 콘텐츠: 운영자(ian) 단독, Notion DB `Places`.
- 추후 외부 협업 시: Notion DB 권한 readonly로 공유.

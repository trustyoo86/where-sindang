# 장소 상세 화면 — Intercepting Routes 모달 + Dummy Data 디자인

작성일: 2026-05-17
대상 브랜치: feature/set-design
관련 코드: [src/app/page.tsx](src/app/page.tsx), [src/app/layout.tsx](src/app/layout.tsx), [src/lib/notion/types.ts](src/lib/notion/types.ts)

---

## 0. RALPLAN-DR 요약 (Consensus 모드 — Short)

### Principles (4)
1. **App Router native 우선** — 외부 모달 라이브러리 도입 없이 Parallel/Intercepting Routes만으로 UX 달성.
2. **단일 상세 컴포넌트, 두 컨테이너** — 모달과 풀페이지가 동일 콘텐츠(`PlaceDetail`)를 공유해 중복 제거.
3. **디자인 토큰 재사용** — globals.css의 기존 토큰만 사용. 신규 컬러/폰트 금지.
4. **점진적 스코프** — 미니멀 상세(히어로/제목/카테고리/주소)로 출시 후 본문·태그·지도는 분리 PR.

### Decision Drivers (Top 3)
1. **UX: 리스트 컨텍스트 보존** — 카드 클릭 시 스크롤 위치/필터 상태가 사라지지 않을 것. (Airbnb 패턴 요구)
2. **공유성/SEO: URL 고유성** — 모달 상태도 URL로 공유/북마크/새로고침 가능해야 함.
3. **구현 단순성** — Notion 연동 전 단계의 디자인 검증 단계이므로 과도한 추상화/라이브러리 도입 회피.

### Viable Options

**Option A — Intercepting Routes + Parallel `@modal` 슬롯 (채택)**
- 장점: Next.js 공식 패턴, URL과 모달 상태 일치, 새 탭/새로고침 시 풀페이지 자동 fallback, 라이브러리 0개.
- 단점: `@modal/default.tsx` 누락 시 404, `(.)` 표기 헷갈림, App Router 학습 곡선.

**Option B — Headless UI/Radix Dialog + `useSearchParams` (`?place=slug`)**
- 장점: 라이브러리가 포커스 트랩/접근성 기본 제공, 구현 직관적.
- 단점: 풀페이지 fallback 별도 라우트 필요, URL이 `?place=` 쿼리라 SEO/직링크 약함, 의존성 추가.

**Option C — 사이드 패널/바텀시트 (URL 변경 없음)**
- 장점: 가장 단순, 라우터 의존 없음.
- 단점: **Driver #2(공유성/SEO) 위반** — 공유/새로고침 불가. 사용자 인터뷰에서도 명시적으로 선택되지 않은 옵션.

**Invalidation rationale**: Option C는 Driver #2를 직접 위반하여 탈락. Option B는 충족은 하지만 의존성 추가와 풀페이지 fallback 중복 작성 비용이 크고, 채택된 Airbnb 톤 디자인이 Next.js 공식 Intercepting Routes 예제와 동일 시나리오이므로 Option A가 가장 적합.

---

## 1. 요구사항 요약

메인 그리드의 `PlaceCard`를 클릭하면 같은 페이지 컨텍스트(피드 스크롤 위치) 위에 **모달**로 상세가 뜨고, 동일 URL `/places/[slug]`을 새 탭/새로고침으로 열면 **풀페이지**로 표시되는 Next.js App Router의 Intercepting Routes 패턴을 적용한다. 데이터는 기존 하드코딩 `places[]`를 공유 모듈로 추출한 dummy data를 그대로 재사용한다.

**상세 화면 표시 범위 (미니멀):**
- 히어로 이미지 (기존 `imageStyles` 그라데이션 재사용)
- 제목 (`place.title`)
- 카테고리 배지 (`CATEGORY_LABELS[place.category]`)
- 주소 (`place.address`)

`summary`, `tags`, `igUrl`, 지도, 추천 카드는 이번 라운드 **out of scope**. (타입에는 남아있으므로 추후 확장 안전.)

---

## 2. Acceptance Criteria (모두 testable)

1. **AC1 — 카드 클릭 시 모달 진입**: 메인(`/`)에서 임의의 `PlaceCard`를 클릭하면 URL이 `/places/<slug>`로 바뀌고, 메인 그리드 위에 상세 모달이 오버레이된다. 메인 콘텐츠는 DOM에서 언마운트되지 않는다 (스크롤 위치 유지).
2. **AC2 — 직접 진입 시 풀페이지**: 브라우저에서 `/places/central-market-noodle`을 새 탭으로 열거나 새로고침하면 메인 그리드 없이 풀페이지 상세가 단독으로 렌더된다.
3. **AC3 — 모달 닫기 동작**: 모달 우상단 닫기 버튼 클릭, `Esc` 키, 오버레이(백드롭) 클릭 시 모달이 닫히고 URL이 `/`로 되돌아간다. 메인(`/`)에서 진입한 경우뿐 아니라 외부 사이트/직링크로 진입한 경우에도 `router.push("/")`로 메인 이동을 보장한다 (외부 사이트로 빠져나가지 않음).
4. **AC4 — 상세 콘텐츠 정확성**: 상세 화면(모달/풀페이지 모두)에 해당 `place`의 `title`, `CATEGORY_LABELS[category]`, `address`, 그리고 `cover.url`에 매핑되는 그라데이션이 표시된다.
5. **AC5 — 존재하지 않는 slug**: `/places/unknown-slug`로 진입 시 Next.js `notFound()`가 호출되어 404가 렌더된다 (풀페이지·모달 양쪽).
6. **AC6 — 빌드/린트 통과**: `yarn build`, `yarn lint` 통과. 신규 파일에 TypeScript 에러 없음.
7. **AC7 — 디자인 일관성**: 기존 디자인 토큰(rausch-coral `#ff385c`, carbon `#222222`, fog `#f7f7f7`, 라운드 `rounded-[20px]`, 카드 섀도우 패턴) 재사용. 신규 컬러/폰트 도입 없음.
8. **AC8 — 접근성**: 모달은 `role="dialog"`, `aria-modal="true"`, `aria-labelledby`로 제목과 연결. 첫 진입 시 닫기 버튼에 포커스, `Esc` 처리.

---

## 3. 구현 단계

### Step 1 — Dummy data 공유 모듈로 추출

기존 [src/app/page.tsx:5-112](src/app/page.tsx#L5-L112)의 `places[]`, `imageStyles`, `categoryStyles`를 페이지에서 분리.

**신규 파일:**
- `src/lib/places/data.ts` — `places: Place[]` export + `getPlaceBySlug(slug: string): Place | undefined` 헬퍼
- `src/lib/places/styles.ts` — `imageStyles: Record<string, string>` (그라데이션 매핑), `categoryStyles: Record<Place["category"], string>`

**수정 파일:**
- [src/app/page.tsx](src/app/page.tsx) — `places`, `imageStyles`, `categoryStyles` import로 교체 (인라인 정의 제거)

검증: 메인 페이지가 시각적으로 변하지 않아야 함 (스크린샷 diff 또는 육안).

### Step 2 — Place 상세 풀페이지 라우트

**신규 파일:** `src/app/places/[slug]/page.tsx`

```ts
// 시그니처 개요
export default async function PlaceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const place = getPlaceBySlug(slug);
  if (!place) notFound();
  return <PlaceDetail place={place} variant="page" />;
}

export function generateStaticParams() {
  return places.map((p) => ({ slug: p.slug }));
}
```

`PlaceDetail` 컴포넌트는 `variant`로 풀페이지/모달 컨테이너만 다르게 감싸고 내부 콘텐츠는 동일하게 렌더.

### Step 3 — Modal 슬롯 + 인터셉트 라우트 추가

**신규 파일:**
- `src/app/@modal/default.tsx` — `export default function Default() { return null; }` (슬롯 미진입 시 빈 상태, 루트 레벨)
- `src/app/@modal/(.)places/[slug]/default.tsx` — **`return null` 동일.** `/places/[slug]`를 하드 네비게이션(직접 URL 입력/새로고침)했을 때 `@modal` 슬롯이 nested 세그먼트에서 fallback 해석에 실패해 404로 빠지는 알려진 Next.js Parallel Routes 함정을 차단. (Critic 지적 #2)
- `src/app/@modal/(.)places/[slug]/page.tsx` — 인터셉트된 모달 페이지. 동일하게 `getPlaceBySlug` + `notFound` 처리 후 `<Modal>`로 감싼 `<PlaceDetail variant="modal">` 렌더

**수정 파일:** [src/app/layout.tsx:22-39](src/app/layout.tsx#L22-L39)
- `RootLayout` 시그니처에 `modal: React.ReactNode` 추가
- `<main>` 옆에 `{modal}` 슬롯 삽입

```tsx
export default function RootLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <html lang="ko" ...>
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        {modal}
        <MobileTabBar />
      </body>
    </html>
  );
}
```

### Step 4 — 공통 PlaceDetail 컴포넌트

**신규 파일:** `src/components/PlaceDetail.tsx`

구조:
```
<article>
  <div class="hero">  // aspect-[16/10] or aspect-[2/1], imageStyles[place.cover.url]
    <span class="category-badge">{CATEGORY_LABELS[category]}</span>
  </div>
  <header class="meta">
    <h1>{title}</h1>
    <p class="address">{address}</p>
  </header>
</article>
```

- 풀페이지 variant: `max-w-[960px] mx-auto px-6 pt-10 pb-20`
- 모달 variant: `Modal` 컴포넌트가 외곽 패딩/스크롤 책임. `PlaceDetail` 내부는 동일.

### Step 5 — Modal 컴포넌트 (백드롭 + 닫기)

**신규 파일:** `src/components/Modal.tsx` (`"use client"`)

요구 동작:
- **포털 미사용.** `{modal}` 슬롯이 이미 `<body>` 직속에서 `<main>` 형제로 렌더되므로([src/app/layout.tsx:32-37](src/app/layout.tsx#L32-L37)) `createPortal`은 불필요한 추상화. 슬롯 위치 그대로 div 기반으로 렌더. (Critic 지적 #4)
- 최상위 백드롭: `fixed inset-0 z-40 bg-black/40` — SiteHeader/MobileTabBar(둘 다 `z-30`)보다 상위. (Critic 지적 #6)
- 모달 컨테이너: `relative z-50 max-w-[960px] w-[92vw] max-h-[90vh] overflow-y-auto rounded-[20px] bg-white shadow-[rgba(0,0,0,0.02)_0_0_0_1px,rgba(0,0,0,0.16)_0_24px_64px_0]`
- `useEffect`로 마운트 시 `document.body.style.overflow = "hidden"` (언마운트 시 원복)
- `Esc` 키 → `closeModal()` 호출
- 백드롭 클릭 → `closeModal()` (콘텐츠 영역 클릭은 `stopPropagation`)
- 닫기 버튼 (`✕`, `aria-label="닫기"`) 우상단 absolute → `closeModal()`
- **`closeModal()` 구현:** 단순히 `router.push("/")` 호출. `router.back()` + `history.length` 가드 방식은 외부 리퍼러 시나리오(외부 사이트 → `/` → 카드 클릭 시 `history.length >= 2`라 가드 통과해 외부로 나감)를 막을 수 없어 폐기. `router.push("/")`로 항상 메인 복귀 보장 — 단순하고 안전. (Critic 지적 #3, Architect 지적 #2)
- 진입 시 닫기 버튼 `autoFocus`
- `role="dialog" aria-modal="true" aria-labelledby="modal-title"` — `PlaceDetail`의 `<h1>`이 `id="modal-title"`을 가지도록 variant에 따라 id 부여

### Step 6 — PlaceCard → Link 래핑

**수정 파일:** [src/app/page.tsx:229-265](src/app/page.tsx#L229-L265)

`<article>` 태그는 **유지**하고, 그 바깥을 `<Link>`로 감싸 시맨틱 보존. (Architect 지적 #5)

```tsx
<Link href={`/places/${place.slug}`} className="group block">
  <article>
    <div className="... group-hover:scale-[1.02] transition-transform duration-200">
      ...
    </div>
    ...
  </article>
</Link>
```

hover 트랜지션은 이미지 컨테이너에 `group-hover:scale-[1.02] transition-transform duration-200` 정도로 가볍게.

### Step 7 — 검증

- `yarn dev` 기동 → 카드 클릭 → 모달 진입 확인 → `Esc`/백드롭/닫기 버튼 각각 닫힘 확인 → 새 탭으로 `/places/<slug>` 직접 열기 → 풀페이지 확인 → `/places/unknown` → 404 확인
- `yarn lint` & `yarn build` 통과 확인

---

## 4. 파일 변경 매트릭스

| 파일 | 작업 | 비고 |
|---|---|---|
| `src/lib/places/data.ts` | 신규 | places[], getPlaceBySlug |
| `src/lib/places/styles.ts` | 신규 | imageStyles, categoryStyles |
| `src/app/places/[slug]/page.tsx` | 신규 | 풀페이지 + generateStaticParams |
| `src/app/@modal/default.tsx` | 신규 | null slot (루트) |
| `src/app/@modal/(.)places/[slug]/default.tsx` | 신규 | null slot (nested — 하드 네비게이션 안전망) |
| `src/app/@modal/(.)places/[slug]/page.tsx` | 신규 | 인터셉트 모달 페이지 |
| `src/components/PlaceDetail.tsx` | 신규 | 공통 콘텐츠, variant prop |
| `src/components/Modal.tsx` | 신규 | "use client", 슬롯 직접 렌더(포털 X), z-40/50, Esc/backdrop |
| `src/app/layout.tsx` | 수정 | modal 슬롯 prop 추가 |
| `src/app/page.tsx` | 수정 | data/styles import + PlaceCard → Link |

---

## 5. 리스크와 완화책

| 리스크 | 영향 | 완화 |
|---|---|---|
| **Intercepting Routes의 `(.)` 표기 헷갈림** | 모달이 동작 안 함 (그냥 풀페이지로 가버림) | `@modal/(.)places/[slug]`는 `@modal` 슬롯이 `app/` 루트와 같은 레벨이므로 `(.)`이 맞음. 검증 시 카드 클릭으로 모달이 뜨는지 명시적으로 확인. |
| **`@modal` nested `default.tsx` 누락** | `/places/[slug]` 하드 네비게이션 시 슬롯이 nested 세그먼트에서 fallback을 못 찾아 404로 빠질 수 있음 | `src/app/@modal/(.)places/[slug]/default.tsx`도 `null` 반환으로 추가. (Step 3) |
| **닫기 시 외부 사이트로 빠져나감** (외부 → `/` → 카드 클릭 시 `history.length >= 2`라 `back()` 가드 회피) | UX 치명적 | `router.back()` 및 `history.length` 가드 폐기. 모든 닫기 경로에서 `router.push("/")` 단일 호출. 뒤로가기 애니메이션은 손실하지만 안전성 우선. |
| **`body` overflow lock 누수** | 모달 닫혀도 스크롤 잠김 | `useEffect` cleanup에서 반드시 원복. 여러 모달 동시 진입 가능성은 현 구조상 없음. |
| **z-index 충돌** | SiteHeader/MobileTabBar(`z-30`)가 모달 위로 떠 보일 위험 | 백드롭 `z-40`, 모달 컨테이너 `z-50` 명시. 포털 미사용이라 슬롯 위치(body 직속)에서 자연스럽게 상위 스택. |
| **`generateStaticParams`로 인한 빌드 시간 증가** | 무시 가능 (현재 6개) | 그대로 진행. Notion 연동 이후 페이지 수 늘면 ISR 검토. |
| **모바일 `MobileTabBar` 가림** | 모달 하단이 탭바와 겹침 | z-index로 모달이 탭바 위에 오게 처리(완료). 탭바 자체 숨김은 후속 작업으로 미룸. |
| **Next.js 16 고유 동작 회귀** | Parallel/Intercepting Routes 동작이 15 → 16 사이 미세 변경 가능성 | Step 7 검증에 "하드 네비게이션 후 카드 클릭 → 모달 정상" 시나리오 명시. `params: Promise<>` 이미 적용됨. |

---

## 6. 검증 단계 (수동)

1. `yarn dev` → http://localhost:3000 접속
2. **AC1**: 첫 번째 카드(`중앙시장 칼국수집`) 클릭 → URL `/places/central-market-noodle` 확인, 모달 오버레이 확인, 뒤 메인 그리드가 DOM에 살아있는지 DevTools로 확인
3. **AC3 (메인 진입)**: 닫기 버튼 클릭 / `Esc` / 백드롭 클릭 — 세 경로 모두 메인 `/`으로 복귀 (URL 포함)
4. **AC3 (외부 진입 시뮬레이션)**: DevTools 콘솔에서 `location.href = "/places/sindang-roastery"` 실행 → 풀페이지 → 직접 `/places/late-night-dumpling`으로 한 번 더 이동 → 풀페이지에서 모달이 뜨지 않음 확인 → 별도 탭에서 `/`로 진입 후 카드 클릭 → 모달의 닫기 동작이 외부로 빠져나가지 않고 `/`로 복귀 확인
5. **AC2**: `cmd+클릭`으로 새 탭에서 카드 열기 → 풀페이지 렌더 확인 (메인 그리드 없음)
6. **AC2 (새로고침)**: 모달 상태에서 `cmd+R` → 풀페이지로 변환 확인. 그 다음 메인으로 돌아가 다시 카드 클릭 시 모달 정상 동작 (nested `default.tsx` 검증)
7. **AC4**: 모달과 풀페이지 양쪽에서 제목/카테고리/주소/그라데이션 일치 확인
8. **AC5**: 주소창에 `/places/foo` 직접 입력 → 404 확인. 카드 클릭 모달 상태에서 같은 시나리오는 인터셉트가 일어나지 않으므로 풀페이지 404로 확인
9. **AC6**: `yarn lint` → 0 errors / `yarn build` → 성공 확인. 빌드 로그에 Parallel/Intercepting Routes 관련 경고 없는지 확인
10. **AC7**: 디자인 토큰 grep — 신규 파일에 `#ff385c`, `#222222`, `#6a6a6a`, `#dddddd`, `#ebebeb`, `#f7f7f7`, `#ffffff` 외 새로운 hex 컬러가 없는지 확인 (`rg "#[0-9a-fA-F]{3,6}" src/app/places src/app/@modal src/components/PlaceDetail.tsx src/components/Modal.tsx`)
11. **AC8**: 모달 진입 시 닫기 버튼 포커스 / `Tab`이 모달 안에서만 순환 (트랩은 best-effort, 미니멀 구현으로 OK). 모달 컨테이너 `aria-modal="true"` 속성 DOM 확인
12. **z-index 검증**: 모달 진입 시 SiteHeader(상단)와 MobileTabBar(하단, 모바일 폭)가 모달 아래로 들어가는지 시각 확인

---

## 7. Out of Scope (후속 작업 후보)

- 이미지 갤러리 / 본문 / 태그 / IG 링크 / 추천 카드 섹션
- 모달 진입/퇴장 애니메이션 (framer-motion 또는 CSS transition)
- 포커스 트랩(focus-trap-react)
- 모달 진입 시 `MobileTabBar` 숨김
- Notion 실 데이터 연동 (`src/lib/notion/`)
- 상세 페이지 메타데이터(`generateMetadata`)로 OG 이미지/타이틀 동적 생성

---

## 8. ADR — Place Detail Modal Pattern

- **Decision**: App Router의 **Intercepting Routes + Parallel `@modal` 슬롯** (Option A) 채택.
- **Drivers (Top 3)**:
  1. UX — 카드 클릭 시 리스트 컨텍스트(스크롤 위치) 보존.
  2. 공유성/SEO — 모달 상태가 URL에 매핑되어 공유/북마크/새로고침 가능.
  3. 구현 단순성 — Notion 연동 전 디자인 검증 단계라 외부 라이브러리 도입 회피.
- **Alternatives considered**:
  - **Option B (Headless Dialog + `?place=slug`)** — 라이브러리 의존, 쿼리 파라미터의 약한 SEO, 풀페이지 fallback 중복 작성 비용으로 탈락.
  - **Option C (사이드 패널/바텀시트, URL 변경 없음)** — Driver #2 직접 위반으로 탈락.
- **Why chosen**: Next.js 공식 패턴이고 라이브러리 0개로 세 드라이버를 모두 만족. Airbnb 스타일 디자인 톤과 정합.
- **Consequences**:
  - (+) URL 일관성, 새로고침/공유 안전, 라이브러리 의존 0.
  - (+) 한 콘텐츠 컴포넌트(`PlaceDetail`)를 모달/풀페이지가 공유 → 변경 비용 최소화.
  - (−) `router.back()` 대신 `router.push("/")`로 단순화 → 브라우저 네이티브 뒤로가기 애니메이션 손실 (외부 리퍼러 안전성 우선).
  - (−) `@modal/default.tsx`와 `@modal/(.)places/[slug]/default.tsx` 2개 fallback 파일 유지 비용.
  - (−) 포커스 트랩은 best-effort (스코프 밖).
- **Follow-ups (Out of Scope 후속)**:
  - 본문/태그/IG/지도/추천 카드 섹션 추가
  - 모달 진입/퇴장 애니메이션
  - `focus-trap-react` 도입
  - 모달 진입 시 `MobileTabBar` 숨김 처리
  - Notion 실 데이터 연동
  - `generateMetadata`로 OG 메타데이터 동적 생성
  - `PlaceCard` 내부에 interactive 요소(태그 클릭 등) 추가 시 nested `<a>` 회피를 위한 `<Link>` 범위 축소 리팩터링

---

## 9. 참고 — Next.js 16 공식 패턴 근거

대상 프레임워크: **Next.js 16.2.6** ([package.json](package.json#L12)).

- Intercepting Routes: `app/@modal/(.)places/[slug]/page.tsx` 에서 `(.)`은 `@modal` 슬롯과 같은 레벨인 `app/places/...`를 인터셉트한다는 의미.
- Parallel Routes의 `default.tsx`: 슬롯이 활성화되지 않은 상태(메인 화면만)에서 렌더할 fallback. 누락 시 404로 빠질 수 있어 **필수**. 본 플랜에서는 루트(`@modal/default.tsx`)와 nested(`@modal/(.)places/[slug]/default.tsx`) **둘 다** 생성.
- Next.js 15+/16에서 `params`는 `Promise<{...}>`로 감싸진다. Step 2 코드 샘플에 `await params` 반영됨.
- 모달 닫기는 `router.back()` 대신 `router.push("/")` 사용. `back()`은 외부 리퍼러를 만난 경우 외부로 빠져나가는 보안/UX 결함이 있어 의도적으로 회피 (RALPLAN-DR 리스크 #3 참조).

---

## 10. Consensus 변경 로그

**Iteration 1 — Architect/Critic 검토 후 반영된 개선사항:**

1. Next.js 버전 표기 정정 (15 → 16.2.6, Section 9).
2. `src/app/@modal/(.)places/[slug]/default.tsx` 추가 — Parallel Routes nested 세그먼트의 하드 네비게이션 fallback 안전망 (Step 3, 파일 매트릭스, 리스크 테이블).
3. `router.back()` + `window.history.length` 가드 폐기 → `router.push("/")` 단일 호출 — 외부 리퍼러 시 외부 사이트로 빠져나가는 결함 차단 (Step 5, 리스크 테이블).
4. `createPortal` 제거 — `{modal}` 슬롯이 이미 `<body>` 직속 `<main>` 형제로 렌더되므로 포털 불필요 (Step 5, 파일 매트릭스).
5. `<Link>` + `<article>` 중첩 구조 명시 — `<article>` 시맨틱 보존 (Step 6).
6. z-index 명시 — 백드롭 `z-40`, 컨테이너 `z-50` (SiteHeader/MobileTabBar의 `z-30` 위로) (Step 5, 리스크 테이블).
7. AC3에 외부 진입 케이스 추가.
8. 검증 단계 #4(외부 진입 시뮬레이션), #6(nested default.tsx 검증), #12(z-index 시각 확인) 추가.

**Iteration 2 — Architect/Critic 재검토 결과: 둘 다 APPROVE.** 추가 수정 없음. 본 ADR 섹션 추가로 consensus 종료.

export default function Home() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        where-sindang — coming soon
      </h1>
      <p className="text-base leading-7 text-foreground/70">
        서울 신당동의 음식·카페·문화 공간·골목을 큐레이션으로 소개합니다.
        Phase 1 공개 베타 준비 중입니다.
      </p>
      <ul className="grid grid-cols-2 gap-2 text-sm md:grid-cols-4">
        <li className="rounded-lg border border-black/10 px-3 py-2 text-center">
          음식
        </li>
        <li className="rounded-lg border border-black/10 px-3 py-2 text-center">
          카페
        </li>
        <li className="rounded-lg border border-black/10 px-3 py-2 text-center">
          문화
        </li>
        <li className="rounded-lg border border-black/10 px-3 py-2 text-center">
          공간·골목
        </li>
      </ul>
    </section>
  );
}

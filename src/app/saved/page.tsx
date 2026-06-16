import Link from "next/link";
import { auth } from "@/auth";
import { listSaved } from "@/lib/saved/db";
import { places } from "@/lib/places/data";
import { PlaceCard } from "@/components/PlaceCard";

export const metadata = { title: "내 찜 — 어디가신당" };

export default async function SavedPage() {
  const session = await auth();

  if (!session?.user?.uk) {
    return (
      <Empty
        title="로그인하면 찜한 공간이 모입니다"
        cta={<Link href="/api/auth/signin" className="font-semibold text-[#ff385c] hover:underline">로그인</Link>}
      />
    );
  }

  const slugs = new Set(await listSaved(session.user.uk));
  const saved = places.filter((p) => slugs.has(p.slug));

  if (saved.length === 0) {
    return (
      <Empty
        title="아직 찜한 공간이 없어요"
        cta={<Link href="/" className="font-semibold text-[#ff385c] hover:underline">공간 둘러보기</Link>}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#222222]">
      <section className="mx-auto w-full max-w-[1760px] px-4 pb-20 pt-8 sm:px-6 lg:px-10">
        <h1 className="text-[22px] font-semibold leading-[1.23] tracking-[-0.2px]">내 찜</h1>
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {saved.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Empty({ title, cta }: { title: string; cta: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[1760px] flex-col items-center justify-center gap-3 px-4 text-center">
      <p className="text-base font-medium text-[#222222]">{title}</p>
      {cta}
    </div>
  );
}

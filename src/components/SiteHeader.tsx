import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#ebebeb] bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-[1760px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="text-base font-bold tracking-[-0.009em] text-[#ff385c]"
        >
          어디가신당
        </Link>
        <span className="text-xs font-medium text-[#6a6a6a]">
          신당동 동네 가이드
        </span>
      </div>
    </header>
  );
}

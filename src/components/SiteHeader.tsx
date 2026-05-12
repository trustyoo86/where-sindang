import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-black/10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        <Link href="/" className="text-base font-semibold tracking-tight">
          where-sindang
        </Link>
        <span className="text-xs text-foreground/60">신당동 동네 가이드</span>
      </div>
    </header>
  );
}

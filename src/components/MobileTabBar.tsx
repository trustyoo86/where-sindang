import Link from "next/link";

interface Tab {
  href: string;
  label: string;
}

const TABS: Tab[] = [
  { href: "/", label: "피드" },
  { href: "/", label: "지도" },
  { href: "/", label: "정보" },
];

export function MobileTabBar() {
  return (
    <nav
      aria-label="primary"
      className="sticky bottom-0 z-30 border-t border-black/10 bg-background/90 backdrop-blur md:hidden"
    >
      <ul className="mx-auto flex max-w-3xl">
        {TABS.map((tab) => (
          <li key={tab.label} className="flex-1">
            <Link
              href={tab.href}
              className="flex h-14 items-center justify-center text-sm text-foreground/70 transition-colors hover:text-foreground"
            >
              {tab.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

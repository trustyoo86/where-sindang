import Link from "next/link";
import { auth, signIn, signOut } from "@/auth";

export async function SiteHeader() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-30 border-b border-[#ebebeb] bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-[1760px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="text-base font-bold tracking-[-0.009em] text-[#ff385c]"
        >
          어디가신당
        </Link>

        {session?.user ? (
          <div className="flex items-center gap-4">
            <Link
              href="/saved"
              className="text-sm font-semibold text-[#222222] hover:underline"
            >
              내 찜
            </Link>
            {session.user.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={session.user.image}
                alt={session.user.name ?? "프로필"}
                className="h-8 w-8 rounded-full"
              />
            )}
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button className="text-sm font-medium text-[#6a6a6a] hover:text-[#222222]">
                로그아웃
              </button>
            </form>
          </div>
        ) : (
          <form
            action={async () => {
              "use server";
              await signIn();
            }}
          >
            <button className="text-sm font-semibold text-[#222222] hover:underline">
              로그인
            </button>
          </form>
        )}
      </div>
    </header>
  );
}

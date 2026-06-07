import Image from "next/image";
import type { Post } from "@/lib/posts/types";

type PostDetailProps = {
  post: Post;
  variant: "page" | "modal";
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

export function PostDetail({ post, variant }: PostDetailProps) {
  const titleId = variant === "modal" ? "modal-title" : "page-title";

  const containerClass =
    variant === "page"
      ? "mx-auto w-full max-w-[720px] px-6 pt-10 pb-20"
      : "px-6 pt-8 pb-10 sm:px-10 sm:pt-12";

  return (
    <article className={containerClass}>
      <header>
        <p className="text-xs font-semibold tracking-[0.04em] text-[#ff385c]">
          @어디가신당
        </p>
        <h1
          id={titleId}
          className="mt-2 text-[26px] font-bold leading-[1.14] tracking-[-0.02em] text-[#222222] sm:text-[32px]"
        >
          {post.title}
        </h1>
        <p className="mt-2 text-sm text-[#6a6a6a]">{formatDate(post.date)}</p>
      </header>

      <div className="mt-6 flex flex-col gap-3">
        {post.images.map((image, index) => (
          <div
            key={image.url}
            className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-[#dddddd]"
          >
            <Image
              src={image.url}
              alt={image.alt ?? `${post.title} ${index + 1}`}
              fill
              sizes="(min-width: 720px) 680px, 90vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <p className="mt-6 whitespace-pre-line text-sm leading-7 text-[#222222]">
        {post.caption}
      </p>

      <a
        href={post.permalink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-lg border border-[#222222] px-4 py-2.5 text-sm font-medium text-[#222222] transition-colors hover:bg-[#f7f7f7]"
      >
        인스타그램에서 원본 보기 ↗
      </a>
    </article>
  );
}

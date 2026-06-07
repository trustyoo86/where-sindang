import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/posts/types";

export function PostCard({ post }: { post: Post }) {
  const cover = post.images[0];
  const isCarousel = post.images.length > 1;

  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article>
        <div className="relative aspect-square overflow-hidden rounded-[20px] bg-[#dddddd]">
          <Image
            src={cover.url}
            alt={cover.alt ?? post.title}
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
          />
          {isCarousel && (
            <span
              aria-label={`사진 ${post.images.length}장`}
              className="absolute right-3 top-3 rounded bg-white px-2 py-1 text-[11px] font-semibold text-[#222222] drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]"
            >
              ▦ {post.images.length}
            </span>
          )}
        </div>

        <div className="px-1 pt-3">
          <h3 className="text-sm font-semibold leading-5 tracking-[-0.009em] text-[#222222]">
            {post.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm leading-5 text-[#6a6a6a]">
            {post.caption}
          </p>
        </div>
      </article>
    </Link>
  );
}

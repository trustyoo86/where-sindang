import { posts } from "@/lib/posts/data";
import { PostCard } from "@/components/PostCard";

export function PostFeed() {
  return (
    <section>
      <div>
        <h2 className="text-[22px] font-semibold leading-[1.23] tracking-[-0.2px] text-[#222222]">
          신당 피드 <span aria-hidden="true">→</span>
        </h2>
        <p className="mt-1 text-sm leading-6 text-[#6a6a6a]">
          인스타그램 @어디가신당의 기록. 사진을 누르면 전체를 볼 수 있어요.
        </p>
      </div>
      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

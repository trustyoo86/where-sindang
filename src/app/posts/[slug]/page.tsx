import { notFound } from "next/navigation";
import Home from "@/app/page";
import Modal from "@/components/Modal";
import { PostDetail } from "@/components/PostDetail";
import { getPostBySlug, posts } from "@/lib/posts/data";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  // URL 직접 진입/새로고침에서는 인터셉트가 없으므로 리스트(Home) 위에 모달을 직접 띄운다.
  return (
    <>
      <Home />
      <Modal titleId="modal-title" dismissMode="home">
        <PostDetail post={post} variant="modal" />
      </Modal>
    </>
  );
}

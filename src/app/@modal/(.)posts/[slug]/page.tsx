import { notFound } from "next/navigation";
import { PostDetail } from "@/components/PostDetail";
import Modal from "@/components/Modal";
import { getPostBySlug } from "@/lib/posts/data";

export default async function PostDetailModalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  return (
    <Modal titleId="modal-title" dismissMode="back">
      <PostDetail post={post} variant="modal" />
    </Modal>
  );
}

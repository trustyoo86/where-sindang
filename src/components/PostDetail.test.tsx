import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PostDetail } from "./PostDetail";
import type { Post } from "@/lib/posts/types";

const post: Post = {
  id: "post-test-1",
  slug: "test-post",
  title: "테스트 게시물 제목",
  caption: "여러 줄로 된\n캡션 본문",
  images: [
    { url: "/posts/a.png", alt: "사진 1" },
    { url: "/posts/b.png", alt: "사진 2" },
    { url: "/posts/c.png", alt: "사진 3" },
  ],
  permalink: "https://www.instagram.com/p/TEST/",
  date: "2026-06-01T00:00:00.000Z",
};

describe("PostDetail", () => {
  it("게시물의 모든 사진을 갤러리로 렌더한다", () => {
    render(<PostDetail post={post} variant="modal" />);
    expect(screen.getAllByRole("img")).toHaveLength(post.images.length);
  });

  it("제목과 캡션을 보여준다", () => {
    render(<PostDetail post={post} variant="modal" />);
    expect(screen.getByText("테스트 게시물 제목")).toBeInTheDocument();
    expect(screen.getByText(/캡션 본문/)).toBeInTheDocument();
  });

  it("인스타그램 원본 링크를 새 탭으로 연다", () => {
    render(<PostDetail post={post} variant="modal" />);
    const link = screen.getByRole("link", { name: /원본 보기/ });
    expect(link).toHaveAttribute("href", post.permalink);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });
});

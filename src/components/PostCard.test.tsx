import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PostCard } from "./PostCard";
import type { Post } from "@/lib/posts/types";

const carouselPost: Post = {
  id: "post-test-1",
  slug: "test-carousel",
  title: "테스트 게시물",
  caption: "캡션 내용",
  images: [
    { url: "/posts/a.png", alt: "첫번째 사진" },
    { url: "/posts/b.png", alt: "두번째 사진" },
    { url: "/posts/c.png", alt: "세번째 사진" },
  ],
  permalink: "https://www.instagram.com/p/TEST/",
  date: "2026-06-01T00:00:00.000Z",
};

describe("PostCard", () => {
  it("첫번째 사진을 썸네일로 렌더하고 상세로 링크한다", () => {
    render(<PostCard post={carouselPost} />);

    expect(screen.getByRole("img", { name: "첫번째 사진" })).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/posts/test-carousel",
    );
  });

  it("사진이 여러 장이면 장수 배지를 보여준다", () => {
    render(<PostCard post={carouselPost} />);
    expect(screen.getByLabelText("사진 3장")).toBeInTheDocument();
  });

  it("사진이 한 장이면 장수 배지를 보여주지 않는다", () => {
    const singlePost: Post = {
      ...carouselPost,
      slug: "test-single",
      images: [{ url: "/posts/a.png", alt: "한 장" }],
    };
    render(<PostCard post={singlePost} />);
    expect(screen.queryByLabelText(/사진 \d+장/)).not.toBeInTheDocument();
  });
});

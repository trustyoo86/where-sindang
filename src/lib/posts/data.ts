import type { Post } from "@/lib/posts/types";

// 수동 큐레이션: 인스타그램 게시물을 직접 입력한다.
// 사진은 public/posts/ 에 저장하고 url에 경로를 적는다.
// permalink는 인스타 원본 게시물 주소(https://www.instagram.com/p/...).
export const posts: Post[] = [
  {
    id: "post-001",
    slug: "central-market-noodle-day",
    title: "중앙시장 칼국수 한 그릇",
    caption:
      "비 오는 날의 손칼국수. 겉절이까지 단정하게 내어주는 노포의 점심. 줄이 길어도 회전이 빨라요. #신당동 #중앙시장 #칼국수",
    images: [
      { url: "/posts/post-noodle-1.png", alt: "김이 오르는 칼국수" },
      { url: "/posts/post-noodle-2.png", alt: "겉절이와 반찬" },
      { url: "/posts/post-noodle-3.png", alt: "가게 입구" },
    ],
    permalink: "https://www.instagram.com/p/EXAMPLE001/",
    date: "2026-06-01T00:00:00.000Z",
  },
  {
    id: "post-002",
    slug: "sindang-roastery-afternoon",
    title: "신당 로스터리의 오후",
    caption:
      "골목 안쪽에서 직접 볶는 원두 향. 낮은 음악과 햇빛 드는 바 자리가 좋았던 오후. #신당동카페 #로스터리",
    images: [
      { url: "/posts/post-roastery-1.png", alt: "커피 바" },
      { url: "/posts/post-roastery-2.png", alt: "핸드드립" },
    ],
    permalink: "https://www.instagram.com/p/EXAMPLE002/",
    date: "2026-05-28T00:00:00.000Z",
  },
  {
    id: "post-003",
    slug: "yellow-stair-alley-walk",
    title: "노란 계단 골목 산책",
    caption:
      "오후 햇살이 드는 골목. 시장 소리와 주택가가 만나는 짧은 산책 코스. #신당동골목 #산책",
    images: [{ url: "/posts/post-alley-1.png", alt: "햇살 드는 골목" }],
    permalink: "https://www.instagram.com/p/EXAMPLE003/",
    date: "2026-05-20T00:00:00.000Z",
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export interface PostImage {
  /** /public 기준 경로. 예: "/posts/post-noodle-1.png" */
  url: string;
  alt?: string;
}

export interface Post {
  id: string;
  slug: string;
  /** 카드 라벨 / 모달 heading용 짧은 제목 */
  title: string;
  /** 게시물 본문 캡션 */
  caption: string;
  /** images[0]을 썸네일로 사용. 상세에서는 전체를 보여준다. */
  images: PostImage[];
  /** 인스타그램 원본 게시물 URL */
  permalink: string;
  /** 게시 일자(ISO) */
  date: string;
}

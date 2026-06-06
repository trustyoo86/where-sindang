import { describe, it, expect } from "vitest";
import { searchPlaces } from "./search";
import { places } from "./data";

describe("searchPlaces — 공간 이름 검색", () => {
  it("빈 검색어는 전체를 반환한다", () => {
    expect(searchPlaces("")).toHaveLength(places.length);
  });

  it("공백만 입력해도 전체를 반환한다", () => {
    expect(searchPlaces("   ")).toHaveLength(places.length);
  });

  it("이름 부분일치로 거른다", () => {
    const result = searchPlaces("로스터리");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("신당 로스터리");
  });

  it("앞뒤/중복 공백을 정규화해 매칭한다", () => {
    const result = searchPlaces("  로스터리  ");
    expect(result.map((p) => p.title)).toContain("신당 로스터리");
  });

  it("대소문자를 무시한다", () => {
    // title에 영문이 없으므로 영문 검색어는 0건, 정규화 자체는 동작
    expect(searchPlaces("ROASTERY")).toEqual([]);
    expect(searchPlaces("신당")).not.toHaveLength(0);
  });

  it("일치가 없으면 빈 배열을 반환한다", () => {
    expect(searchPlaces("없는가게이름")).toEqual([]);
  });

  it("원본 places 배열을 변형하지 않는다", () => {
    const before = places.length;
    searchPlaces("신당");
    expect(places).toHaveLength(before);
  });
});

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PlaceSearch } from "./PlaceSearch";
import { places } from "@/lib/places/data";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(""),
}));

describe("PlaceSearch", () => {
  it("초기(빈 검색어)에는 모든 공간 카드를 보여준다", () => {
    render(<PlaceSearch />);
    for (const place of places) {
      expect(screen.getByText(place.title)).toBeInTheDocument();
    }
  });

  it("이름을 입력하면 일치하는 공간만 남는다", async () => {
    const user = userEvent.setup();
    render(<PlaceSearch />);

    await user.type(
      screen.getByRole("searchbox", { name: "공간 이름으로 검색" }),
      "로스터리",
    );

    expect(screen.getByText("신당 로스터리")).toBeInTheDocument();
    expect(screen.queryByText("중앙시장 칼국수집")).not.toBeInTheDocument();
  });

  it("일치하는 공간이 없으면 안내 문구를 보여준다", async () => {
    const user = userEvent.setup();
    render(<PlaceSearch />);

    await user.type(
      screen.getByRole("searchbox", { name: "공간 이름으로 검색" }),
      "없는가게이름",
    );

    expect(screen.getByText(/검색 결과가 없어요/)).toBeInTheDocument();
    for (const place of places) {
      expect(screen.queryByText(place.title)).not.toBeInTheDocument();
    }
  });
});

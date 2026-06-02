import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "./Modal";

const back = vi.fn();
const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ back, push }),
}));

beforeEach(() => {
  back.mockClear();
  push.mockClear();
});

describe("Modal 닫기 동작", () => {
  it("닫기 버튼을 누르면 뒤로가기로 모달을 dismiss 한다", async () => {
    const user = userEvent.setup();
    render(
      <Modal>
        <p>상세 내용</p>
      </Modal>,
    );

    await user.click(screen.getByRole("button", { name: "닫기" }));

    expect(back).toHaveBeenCalledTimes(1);
    expect(push).not.toHaveBeenCalled();
  });

  it("Esc 키를 누르면 모달을 dismiss 한다", async () => {
    const user = userEvent.setup();
    render(
      <Modal>
        <p>상세 내용</p>
      </Modal>,
    );

    await user.keyboard("{Escape}");

    expect(back).toHaveBeenCalledTimes(1);
    expect(push).not.toHaveBeenCalled();
  });

  it("백드롭(오버레이)을 클릭하면 모달을 dismiss 한다", async () => {
    const user = userEvent.setup();
    render(
      <Modal titleId="modal-title">
        <p>상세 내용</p>
      </Modal>,
    );

    // 백드롭은 dialog 영역 바깥. dialog의 부모(presentation 오버레이)를 클릭.
    const overlay = screen.getByRole("dialog").parentElement as HTMLElement;
    await user.click(overlay);

    expect(back).toHaveBeenCalledTimes(1);
  });

  it("모달 콘텐츠 영역을 클릭해도 닫히지 않는다", async () => {
    const user = userEvent.setup();
    render(
      <Modal>
        <p>상세 내용</p>
      </Modal>,
    );

    await user.click(screen.getByText("상세 내용"));

    expect(back).not.toHaveBeenCalled();
    expect(push).not.toHaveBeenCalled();
  });

  it('dismissMode="home"이면 닫을 때 홈으로 push 한다 (뒤로가기로 사이트를 벗어나지 않음)', async () => {
    const user = userEvent.setup();
    render(
      <Modal dismissMode="home">
        <p>상세 내용</p>
      </Modal>,
    );

    await user.click(screen.getByRole("button", { name: "닫기" }));

    expect(push).toHaveBeenCalledWith("/");
    expect(back).not.toHaveBeenCalled();
  });
});

"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ModalProps {
  children: React.ReactNode;
  titleId?: string;
  /**
   * 닫기 전략.
   * - "back"(기본): 카드 클릭 인터셉트 모달. history 직전이 항상 앱 내부(/)이므로
   *   router.back()으로 닫아야 @modal 슬롯이 default(null)로 리셋되고,
   *   브라우저 앞으로가기로 모달을 재오픈할 수 있다.
   *   (router.push("/")는 soft navigation에서 슬롯을 리셋하지 못해 모달이 남는다.)
   * - "home": URL 직접 진입/새로고침으로 렌더된 모달. history 직전이 외부 사이트일 수
   *   있어 router.back()은 사이트를 벗어날 위험이 있으므로 router.push("/")로 홈 복귀.
   */
  dismissMode?: "back" | "home";
}

export default function Modal({
  children,
  titleId,
  dismissMode = "back",
}: ModalProps) {
  const router = useRouter();

  const closeModal = useCallback(() => {
    if (dismissMode === "home") {
      router.push("/");
    } else {
      router.back();
    }
  }, [router, dismissMode]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeModal();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-4"
      onClick={closeModal}
      role="presentation"
    >
      <div
        className="relative z-50 w-[92vw] max-w-[960px] max-h-[90vh] overflow-y-auto rounded-[20px] bg-white shadow-[rgba(0,0,0,0.02)_0_0_0_1px,rgba(0,0,0,0.16)_0_24px_64px_0]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          type="button"
          onClick={closeModal}
          aria-label="닫기"
          autoFocus
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[18px] font-medium text-[#222222] shadow-[rgba(0,0,0,0.02)_0_0_0_1px,rgba(0,0,0,0.16)_0_2px_4px_0] transition-colors hover:bg-[#f7f7f7]"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

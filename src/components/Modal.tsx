"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ModalProps {
  children: React.ReactNode;
  titleId?: string;
}

export default function Modal({ children, titleId }: ModalProps) {
  const router = useRouter();

  function closeModal() {
    router.push("/");
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        router.push("/");
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);

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

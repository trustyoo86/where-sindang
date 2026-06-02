import { notFound } from "next/navigation";
import Home from "@/app/page";
import Modal from "@/components/Modal";
import { PlaceDetail } from "@/components/PlaceDetail";
import { getPlaceBySlug, places } from "@/lib/places/data";

export function generateStaticParams() {
  return places.map((p) => ({ slug: p.slug }));
}

export default async function PlaceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const place = getPlaceBySlug(slug);
  if (!place) notFound();
  // URL 직접 진입/새로고침(하드 내비)에서는 인터셉트가 일어나지 않으므로
  // 이 페이지가 직접 리스트(Home) 위에 모달을 띄워 "리스트 위 팝업"을 보장한다.
  // history 직전이 외부 사이트일 수 있어 닫기는 router.push("/")(dismissMode="home").
  return (
    <>
      <Home />
      <Modal titleId="modal-title" dismissMode="home">
        <PlaceDetail place={place} variant="modal" />
      </Modal>
    </>
  );
}

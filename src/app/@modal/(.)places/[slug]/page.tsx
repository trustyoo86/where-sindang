import { notFound } from "next/navigation";
import { PlaceDetail } from "@/components/PlaceDetail";
import Modal from "@/components/Modal";
import { getPlaceBySlug } from "@/lib/places/data";

export default async function PlaceDetailModalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const place = getPlaceBySlug(slug);
  if (!place) notFound();
  return (
    <Modal titleId="modal-title">
      <PlaceDetail place={place} variant="modal" />
    </Modal>
  );
}

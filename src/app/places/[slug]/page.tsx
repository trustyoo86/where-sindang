import { notFound } from "next/navigation";
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
  return <PlaceDetail place={place} variant="page" />;
}

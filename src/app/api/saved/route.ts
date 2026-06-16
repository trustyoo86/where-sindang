import { auth } from "@/auth";
import { listSaved, toggleSaved } from "@/lib/saved/db";
import { isKnownSlug } from "@/lib/saved/slug";

export async function GET() {
  const session = await auth();
  if (!session?.user?.uk) return Response.json({ error: "unauthorized" }, { status: 401 });
  return Response.json({ saved: await listSaved(session.user.uk) });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.uk) return Response.json({ error: "unauthorized" }, { status: 401 });

  const { slug } = await req.json().catch(() => ({}));
  if (!isKnownSlug(slug)) return Response.json({ error: "bad slug" }, { status: 400 });

  return Response.json({ saved: await toggleSaved(session.user.uk, slug) });
}

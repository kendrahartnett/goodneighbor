import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin.ok) return Response.json({ error: { code: admin.status === 401 ? "UNAUTHENTICATED" : "FORBIDDEN", message: "Admin access required." } }, { status: admin.status });
  const item = await prisma.listingRequest.findUnique({ where: { id: (await params).id } });
  return item
    ? Response.json(item, { headers: { "Cache-Control": "private, no-store" } })
    : Response.json({ error: { code: "NOT_FOUND", message: "Request not found." } }, { status: 404 });
}

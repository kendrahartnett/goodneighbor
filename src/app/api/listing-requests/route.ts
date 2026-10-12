import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { listingRequestSchema, errors } from "@/lib/validation";
import { uploadPhoto, validatePhoto } from "@/lib/photos";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin.ok) return Response.json({ error: { code: admin.status === 401 ? "UNAUTHENTICATED" : "FORBIDDEN", message: "Admin access required." } }, { status: admin.status });
  const items = await prisma.listingRequest.findMany({ orderBy: [{ createdAt: "desc" }, { id: "desc" }] });
  return Response.json({ items }, { headers: { "Cache-Control": "private, no-store" } });
}

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length")) > 3.5 * 1024 * 1024) return Response.json({ error: { code: "VALIDATION", message: "The request is too large." } }, { status: 400 });
  const form = await request.formData().catch(() => null);
  if (!form) return Response.json({ error: { code: "VALIDATION", message: "Submit the form again." } }, { status: 400 });
  const parsed = listingRequestSchema.safeParse({
    name: form.get("name"), contactInformation: form.get("contactInformation"),
    email: form.get("email"), description: form.get("description"),
  });
  if (!parsed.success) return Response.json({ error: { code: "VALIDATION", message: "Fix the highlighted fields.", fields: errors(parsed.error) } }, { status: 400 });
  const photo = form.get("photo");
  if (photo !== null && !(photo instanceof File)) return Response.json({ error: { code: "VALIDATION", message: "Choose a valid photo." } }, { status: 400 });
  const selected = photo instanceof File && photo.size > 0 ? photo : null;
  if (selected) {
    const problem = await validatePhoto(selected);
    if (problem) return Response.json({ error: { code: "VALIDATION", message: "Fix the highlighted fields.", fields: { photo: problem } } }, { status: 400 });
  }
  try {
    const photoUrl = selected ? await uploadPhoto(selected, "requests") : null;
    const item = await prisma.listingRequest.create({ data: { ...parsed.data, photoUrl } });
    return Response.json({ id: item.id }, { status: 201 });
  } catch {
    return Response.json({ error: { code: "UNAVAILABLE", message: "We could not receive your request. Please try again later." } }, { status: 503 });
  }
}

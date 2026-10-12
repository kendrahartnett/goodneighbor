import { requireAdmin } from "@/lib/admin";
import { uploadPhoto, validatePhoto } from "@/lib/photos";

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin.ok) return Response.json({ error: { code: admin.status === 401 ? "UNAUTHENTICATED" : "FORBIDDEN", message: "Admin access required." } }, { status: admin.status });
  if (Number(request.headers.get("content-length")) > 3.5 * 1024 * 1024) return Response.json({ error: { code: "VALIDATION", message: "The photo must be smaller than 3 MB." } }, { status: 400 });
  const form = await request.formData().catch(() => null);
  const file = form?.get("photo");
  if (!(file instanceof File)) return Response.json({ error: { code: "VALIDATION", message: "Choose a photo." } }, { status: 400 });
  const problem = await validatePhoto(file);
  if (problem) return Response.json({ error: { code: "VALIDATION", message: problem } }, { status: 400 });
  try {
    return Response.json({ imageUrl: await uploadPhoto(file, "listings") }, { status: 201 });
  } catch {
    return Response.json({ error: { code: "STORAGE", message: "Photo storage is unavailable. Try again later." } }, { status: 503 });
  }
}

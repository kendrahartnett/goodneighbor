import { beforeEach, describe, expect, it, vi } from "vitest";

const { requireAdmin, findMany, create, uploadPhoto, validatePhoto } = vi.hoisted(() => ({
  requireAdmin: vi.fn(), findMany: vi.fn(), create: vi.fn(), uploadPhoto: vi.fn(), validatePhoto: vi.fn(),
}));
vi.mock("@/lib/admin", () => ({ requireAdmin }));
vi.mock("@/lib/prisma", () => ({ prisma: { listingRequest: { findMany, create } } }));
vi.mock("@/lib/photos", () => ({ uploadPhoto, validatePhoto }));

import { GET, POST } from "./route";

function request(fields: Record<string, string> = {}) {
  const form = new FormData();
  for (const [key, value] of Object.entries({
    name: "Taylor Neighbor", contactInformation: "Call me at 312-555-0100",
    email: "taylor@example.org", description: "A Chicago neighborhood garden needs helpers on Saturdays.", ...fields,
  })) form.set(key, value);
  return new Request("http://localhost/api/listing-requests", { method: "POST", body: form });
}

describe("listing request API", () => {
  beforeEach(() => { vi.clearAllMocks(); validatePhoto.mockResolvedValue(null); });

  it("accepts a valid public suggestion without a photo", async () => {
    create.mockImplementation(async ({ data }) => ({ id: "request-1", ...data }));
    const response = await POST(request());
    expect(response.status).toBe(201);
    expect(create.mock.calls[0][0].data).toMatchObject({ email: "taylor@example.org", photoUrl: null });
    expect(uploadPhoto).not.toHaveBeenCalled();
  });

  it("returns structured validation errors without storing invalid content", async () => {
    const response = await POST(request({ email: "not-email", description: "short" }));
    expect(response.status).toBe(400);
    expect((await response.json()).error.fields.email).toBeTruthy();
    expect(create).not.toHaveBeenCalled();
  });

  it("denies anonymous inbox access before querying", async () => {
    requireAdmin.mockResolvedValue({ ok: false, status: 401 });
    const response = await GET();
    expect(response.status).toBe(401);
    expect(findMany).not.toHaveBeenCalled();
  });

  it("shows the allowlisted admin requests newest first", async () => {
    requireAdmin.mockResolvedValue({ ok: true });
    findMany.mockResolvedValue([{ id: "new" }, { id: "old" }]);
    const response = await GET();
    expect(response.status).toBe(200);
    expect(findMany.mock.calls[0][0].orderBy).toEqual([{ createdAt: "desc" }, { id: "desc" }]);
    expect((await response.json()).items.map((item: { id: string }) => item.id)).toEqual(["new", "old"]);
  });
});

import { beforeEach, describe, expect, it, vi } from "vitest";

const { requireAdmin, findUnique } = vi.hoisted(() => ({ requireAdmin: vi.fn(), findUnique: vi.fn() }));
vi.mock("@/lib/admin", () => ({ requireAdmin }));
vi.mock("@/lib/prisma", () => ({ prisma: { listingRequest: { findUnique } } }));

import { GET } from "./route";

describe("private listing request detail", () => {
  beforeEach(() => vi.clearAllMocks());
  it("denies a signed-in non-admin before reading data", async () => {
    requireAdmin.mockResolvedValue({ ok: false, status: 403 });
    const response = await GET(new Request("http://localhost/api/listing-requests/id"), { params: Promise.resolve({ id: "id" }) });
    expect(response.status).toBe(403);
    expect(findUnique).not.toHaveBeenCalled();
  });
  it("returns the request to the allowlisted admin", async () => {
    requireAdmin.mockResolvedValue({ ok: true });
    findUnique.mockResolvedValue({ id: "id", name: "Taylor" });
    const response = await GET(new Request("http://localhost/api/listing-requests/id"), { params: Promise.resolve({ id: "id" }) });
    expect(response.status).toBe(200);
    expect((await response.json()).name).toBe("Taylor");
  });
});

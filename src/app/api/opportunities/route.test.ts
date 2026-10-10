import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const { requireAdmin, findMany, count, create } = vi.hoisted(() => ({
  requireAdmin: vi.fn(),
  findMany: vi.fn(),
  count: vi.fn(),
  create: vi.fn(),
}));

vi.mock("@/lib/admin", () => ({ requireAdmin }));
vi.mock("@/lib/prisma", () => ({ prisma: { opportunity: { findMany, count, create } } }));

import { GET, POST } from "./route";

describe("opportunities collection API", () => {
  beforeEach(() => vi.clearAllMocks());

  it("limits public reads to published listings", async () => {
    findMany.mockResolvedValue([]);
    count.mockResolvedValue(0);
    const response = await GET(new NextRequest("http://localhost/api/opportunities"));
    expect(response.status).toBe(200);
    expect(findMany.mock.calls[0][0].where.status).toBe("PUBLISHED");
    expect(count.mock.calls[0][0].where.status).toBe("PUBLISHED");
  });

  it("denies an anonymous create before touching the database", async () => {
    requireAdmin.mockResolvedValue({ ok: false, status: 401 });
    const response = await POST(new Request("http://localhost/api/opportunities", { method: "POST", body: "{}" }));
    expect(response.status).toBe(401);
    expect((await response.json()).error.code).toBe("UNAUTHENTICATED");
    expect(create).not.toHaveBeenCalled();
  });

  it("returns structured field errors for an invalid admin create", async () => {
    requireAdmin.mockResolvedValue({ ok: true });
    const response = await POST(new Request("http://localhost/api/opportunities", { method: "POST", body: "{}" }));
    const body = await response.json();
    expect(response.status).toBe(400);
    expect(body.error.code).toBe("VALIDATION");
    expect(body.error.fields.title).toBeTruthy();
    expect(create).not.toHaveBeenCalled();
  });
});

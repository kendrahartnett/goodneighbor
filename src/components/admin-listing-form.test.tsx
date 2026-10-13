// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }) }));

import { AdminListingForm } from "./admin-listing-form";

describe("new opportunity form", () => {
  afterEach(cleanup);

  it("does not offer photo upload or photo description during creation", () => {
    render(<AdminListingForm />);
    expect(screen.queryByLabelText(/listing photo/i)).toBeNull();
    expect(screen.queryByLabelText(/photo description/i)).toBeNull();
    expect(document.querySelector('input[type="file"]')).toBeNull();
  });
});

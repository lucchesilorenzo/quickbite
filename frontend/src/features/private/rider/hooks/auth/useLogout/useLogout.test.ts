import { renderHook, waitFor } from "@testing-library/react";
import TestQueryWrapper from "@tests/TestQueryWrapper";
import { simulateError } from "@tests/utils/msw";
import { useNotifications } from "@toolpad/core/useNotifications";

import { useLogout } from "./useLogout";

import env from "@/lib/env";

const mockNavigate = vi.fn();
const mockShow = vi.fn();

vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
  useNavigate: () => mockNavigate,
}));

describe("useLogout", () => {
  it("should mutate and return data", async () => {
    const { result } = renderHook(() => useLogout(), {
      wrapper: TestQueryWrapper,
    });

    result.current.mutate();

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(result.current.data).toBeDefined();

    expect(mockNavigate).toHaveBeenCalledWith("/rider/auth/login");
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it("should show notification on error", async () => {
    vi.mocked(useNotifications).mockReturnValue({
      show: mockShow,
      close: vi.fn(),
    });
    simulateError(`${env.VITE_BACKEND_URL}/api/v1/rider/auth/logout`, "post");

    const { result } = renderHook(() => useLogout(), {
      wrapper: TestQueryWrapper,
    });

    result.current.mutate();

    await waitFor(() => expect(result.current.isError).toBeTruthy());

    expect(result.current.error).toBeDefined();

    expect(mockShow).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        key: "rider-logout-error",
        severity: "error",
      }),
    );
  });

  it("should not show notification on success", () => {
    const { result } = renderHook(() => useLogout(), {
      wrapper: TestQueryWrapper,
    });

    result.current.mutate();

    expect(mockShow).not.toHaveBeenCalled();
  });
});

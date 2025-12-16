import { renderHook, waitFor } from "@testing-library/react";
import TestQueryWrapper from "@tests/TestQueryWrapper";
import { loginForm } from "@tests/mocks/data/private/rider/forms/login";
import { simulateError } from "@tests/utils/msw";
import { useNotifications } from "@toolpad/core/useNotifications";

import { useLogin } from "./useLogin";

import env from "@/lib/env";

const mockNavigate = vi.fn();
const mockShow = vi.fn();

vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
  useNavigate: () => mockNavigate,
}));

describe("useLogin", () => {
  it("should mutate and return data", async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: TestQueryWrapper,
    });

    result.current.mutate(loginForm);

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(result.current.data).toBeDefined();

    expect(mockNavigate).toHaveBeenCalledWith("/rider/job-posts");
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it("should show notification on error", async () => {
    vi.mocked(useNotifications).mockReturnValue({
      show: mockShow,
      close: vi.fn(),
    });
    simulateError(`${env.VITE_BASE_URL}/api/rider/auth/login`, "post");

    const { result } = renderHook(() => useLogin(), {
      wrapper: TestQueryWrapper,
    });

    result.current.mutate(loginForm);

    await waitFor(() => expect(result.current.isError).toBeTruthy());

    expect(result.current.error).toBeDefined();

    expect(mockShow).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        key: "rider-login-error",
        severity: "error",
      }),
    );
  });

  it("should not show notification on success", () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: TestQueryWrapper,
    });

    result.current.mutate(loginForm);

    expect(mockShow).not.toHaveBeenCalled();
  });
});

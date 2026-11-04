import { UserRole } from "@/api/models";
import { useAuth } from "@/contexts/AuthProvider";
import { user } from "../mocks/data/public/users";

export function mockAuthState(state?: UserRole | null) {
  if (state === undefined) {
    vi.mocked(useAuth).mockReturnValue({ user: undefined });
    return;
  }

  if (state === null) {
    vi.mocked(useAuth).mockReturnValue({ user: null });
    return;
  }

  vi.mocked(useAuth).mockReturnValue({
    user: {
      ...user,
      roles: [{ ...user.roles![0], name: state }],
    },
  });
}

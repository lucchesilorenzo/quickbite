import { useAuth } from "@/contexts/AuthProvider";
import { Role } from "@/types/user-types";
import { user } from "tests/mocks/data/users";

export function mockAuthState(state?: Role | null) {
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
      roles: [{ ...user.roles[0], name: state }],
    },
  });
}

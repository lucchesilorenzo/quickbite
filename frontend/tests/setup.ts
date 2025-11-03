import "@testing-library/jest-dom/vitest";
import { server } from "./mocks/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

beforeEach(() => {
  vi.clearAllMocks();
});

vi.mock("@/contexts/AuthProvider", () => ({
  useAuth: vi.fn().mockReturnValue({ user: undefined }),
}));

vi.mock("@toolpad/core/useNotifications", () => ({
  useNotifications: vi.fn().mockReturnValue({
    show: vi.fn(),
    close: vi.fn(),
  }),
}));

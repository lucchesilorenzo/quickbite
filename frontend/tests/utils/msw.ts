import { delay, http, HttpResponse } from "msw";
import { server } from "tests/mocks/server";

export function simulateInfiniteLoading(endpoint: string) {
  server.use(http.get(endpoint, () => new Promise(() => {})));
}

export function simulateDelay(endpoint: string) {
  server.use(
    http.get(endpoint, async () => {
      await delay();
      return HttpResponse.json([]);
    })
  );
}

export function simulateError(endpoint: string) {
  server.use(http.get(endpoint, () => HttpResponse.error()));
}

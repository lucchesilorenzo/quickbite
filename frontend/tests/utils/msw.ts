import { delay, http, HttpResponse } from "msw";
import { server } from "tests/mocks/server";

type HttpMethod = "get" | "post" | "patch" | "delete";

export function simulateInfiniteLoading(
  endpoint: string,
  method: HttpMethod = "get"
) {
  server.use(http[method](endpoint, () => new Promise(() => {})));
}

export function simulateDelay(endpoint: string, method: HttpMethod = "get") {
  server.use(
    http[method](endpoint, async () => {
      await delay();
      return HttpResponse.json([]);
    })
  );
}

export function simulateError(endpoint: string, method: HttpMethod = "get") {
  server.use(http[method](endpoint, () => HttpResponse.error()));
}

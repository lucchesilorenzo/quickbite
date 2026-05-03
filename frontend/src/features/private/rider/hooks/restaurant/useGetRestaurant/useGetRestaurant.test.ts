import { renderHook, waitFor } from "@testing-library/react";
import TestQueryWrapper from "@tests/TestQueryWrapper";
import { restaurantResponse } from "@tests/mocks/data/private/rider/restaurant";
import { simulateError } from "@tests/utils/msw";

import { useGetRestaurant } from "./useGetRestaurant";

import env from "@/lib/env";

describe("useGetRestaurant", () => {
  it("should fetch data and return it", async () => {
    const { result } = renderHook(() => useGetRestaurant(), {
      wrapper: TestQueryWrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(result.current.data).toEqual(restaurantResponse);
  });

  it("should fail to fetch data", async () => {
    simulateError(`${env.VITE_BACKEND_URL}/api/v1/rider/restaurant`);

    const { result } = renderHook(() => useGetRestaurant(), {
      wrapper: TestQueryWrapper,
    });

    await waitFor(() => expect(result.current.isError).toBeTruthy());

    expect(result.current.error).toBeDefined();
  });
});

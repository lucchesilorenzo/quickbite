import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { Order } from "@/types/order-types";

export function useGetOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: (): Promise<Order[]> => fetchData("/orders"),
  });
}

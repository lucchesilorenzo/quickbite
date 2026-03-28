import { useQuery } from "@tanstack/react-query";

import { GetOrdersResponse } from "../../types/orders/order.api.types";

import { useAuth } from "@/contexts/AuthProvider";
import { fetchData } from "@/lib/api-client";
import { isCustomer } from "@/lib/utils/auth.utils";

type UseGetOrdersOptions = {
  page?: number;
};

export function useGetOrders({ page = 1 }: UseGetOrdersOptions) {
  const { user } = useAuth();

  return useQuery<GetOrdersResponse>({
    queryKey: ["customer-orders", page],
    queryFn: () => fetchData(`/customer/orders?page=${page}`),
    enabled: isCustomer(user) && !!user.email_verified_at,
  });
}

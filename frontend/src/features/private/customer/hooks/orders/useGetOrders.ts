import { useQuery } from "@tanstack/react-query";

import { getCustomerOrders } from "@/api/endpoints/customer-orders/customer-orders";
import { GetCustomerOrders200, GetCustomerOrders500 } from "@/api/models";
import { useAuth } from "@/contexts/AuthProvider";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";
import { isCustomer } from "@/lib/utils/auth.utils";

type UseGetOrdersOptions = {
  page?: number;
};

export function useGetOrders({ page = 1 }: UseGetOrdersOptions) {
  const { user } = useAuth();

  return useQuery<GetCustomerOrders200, ApiError<GetCustomerOrders500>>({
    queryKey: ["customer-orders", page],
    queryFn: async () => {
      const response = await getCustomerOrders(api).getCustomerOrders({ page });

      return response.data;
    },
    enabled: isCustomer(user) && !!user.email_verified_at,
  });
}

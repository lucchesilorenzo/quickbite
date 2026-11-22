import { useQuery } from "@tanstack/react-query";

import { getCustomerCarts } from "@/api/backend/endpoints/customer-carts/customer-carts";
import { GetCustomerCarts200, GetCustomerCarts500 } from "@/api/backend/models";
import { useAuth } from "@/contexts/AuthProvider";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";
import { isCustomer } from "@/lib/utils/auth.utils";

export function useGetCarts() {
  const { user } = useAuth();

  return useQuery<GetCustomerCarts200, ApiError<GetCustomerCarts500>>({
    queryKey: ["customer-carts"],
    queryFn: async () => {
      const response = await getCustomerCarts(api).getCustomerCarts();

      return response.data;
    },
    enabled: isCustomer(user) && !!user.email_verified_at,
  });
}

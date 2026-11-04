import { useQuery } from "@tanstack/react-query";

import { getCustomerCarts } from "@/api/endpoints/customer-carts/customer-carts";
import { GetCustomerCarts200 } from "@/api/models";
import { useAuth } from "@/contexts/AuthProvider";
import api from "@/lib/api-client";
import { isCustomer } from "@/lib/utils/auth.utils";

export function useGetCarts() {
  const { user } = useAuth();

  return useQuery<GetCustomerCarts200>({
    queryKey: ["customer-carts"],
    queryFn: async () => {
      const response = await getCustomerCarts(api).getCustomerCarts();

      return response.data;
    },
    enabled: isCustomer(user) && !!user.email_verified_at,
  });
}

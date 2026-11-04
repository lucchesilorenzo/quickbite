import { useQuery } from "@tanstack/react-query";

import { getPrivateAuth } from "@/api/endpoints/private-auth/private-auth";
import { GetAuthenticatedUser200 } from "@/api/models";
import api from "@/lib/api-client";

export function useAuthMe() {
  return useQuery<GetAuthenticatedUser200>({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await getPrivateAuth(api).getAuthenticatedUser();

      return response.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled:
      !!localStorage.getItem("access_token") &&
      !!localStorage.getItem("refresh_token"),
  });
}

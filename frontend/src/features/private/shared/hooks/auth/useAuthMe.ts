import { useQuery } from "@tanstack/react-query";

import { getPrivateAuth } from "@/api/backend/endpoints/private-auth/private-auth";
import {
  GetAuthenticatedUser200,
  GetAuthenticatedUser500,
} from "@/api/backend/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

export function useAuthMe() {
  return useQuery<GetAuthenticatedUser200, ApiError<GetAuthenticatedUser500>>({
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

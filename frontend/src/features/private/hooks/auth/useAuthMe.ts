import { useQuery } from "@tanstack/react-query";

import { GetAuthMeResponse } from "../../types/auth/auth.api.types";

import { fetchData } from "@/lib/api-client";

export function useAuthMe() {
  return useQuery<GetAuthMeResponse>({
    queryKey: ["auth"],
    queryFn: () => fetchData("/auth/me"),
    retry: false,
    refetchOnWindowFocus: false,
  });
}

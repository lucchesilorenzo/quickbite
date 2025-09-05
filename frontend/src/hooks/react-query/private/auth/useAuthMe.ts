import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { User } from "@/types";

export function useAuthMe() {
  return useQuery({
    queryKey: ["auth"],
    queryFn: (): Promise<User> => fetchData("/auth/me"),
    retry: false,
    refetchOnWindowFocus: false,
  });
}

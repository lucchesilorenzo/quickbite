import { useQuery } from "@tanstack/react-query";

import { externalApi, fetchData } from "@/lib/api-client";
import env from "@/lib/env";
import { StructuredAddress } from "@/types";

type GetLocation = {
  postcode?: string;
  enabled?: boolean;
};

export function useGetLocation({ postcode, enabled = true }: GetLocation) {
  return useQuery({
    queryKey: ["location", postcode],
    queryFn: (): Promise<StructuredAddress[]> =>
      fetchData(
        `https://eu1.locationiq.com/v1/search.php?key=${env.VITE_LOCATIONIQ_API_KEY}&postalcode=${postcode}&countrycodes=it&format=json&addressdetails=1&limit=1&normalizecity=1&dedupe=1`,
        externalApi,
      ),
    enabled,
    refetchOnWindowFocus: false,
  });
}

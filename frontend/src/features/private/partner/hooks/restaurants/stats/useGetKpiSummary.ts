import {
  PaymentMethodFilter,
  StatRange,
} from "@partner/types/stats/stats.types";
import { useQuery } from "@tanstack/react-query";

import { getPartnerStats } from "@/api/endpoints/partner-stats/partner-stats";
import {
  GetPartnerKpiSummary200,
  GetPartnerKpiSummaryParams,
} from "@/api/models";
import api from "@/lib/api-client";

type UseGetKpiSummaryOptions = {
  restaurantId: string;
  range: StatRange;
  paymentMethod: PaymentMethodFilter;
  year: number;
};

export function useGetKpiSummary({
  restaurantId,
  range,
  paymentMethod,
  year,
}: UseGetKpiSummaryOptions) {
  return useQuery<GetPartnerKpiSummary200>({
    queryKey: ["partner-stats", restaurantId, range, paymentMethod, year],
    queryFn: async () => {
      const params: GetPartnerKpiSummaryParams = {};

      if (range !== "all") params.range = range;
      if (paymentMethod !== "all") params.payment_method = paymentMethod;
      if (year) params.year = year;

      const response = await getPartnerStats(api).getPartnerKpiSummary(
        restaurantId,
        params,
      );

      return response.data;
    },
  });
}

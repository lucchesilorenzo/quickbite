import { createContext, useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { usePartnerRestaurant } from "@/hooks/contexts/private/partner/usePartnerRestaurant";
import { useGetPartnerRestaurantKpiSummary } from "@/hooks/react-query/private/partner/restaurants/stats/useGetPartnerRestaurantKpiSummary";
import { useGetPartnerRestaurantStats } from "@/hooks/react-query/private/partner/restaurants/stats/useGetPartnerRestaurantStats";
import { kpiKeys, statRanges } from "@/lib/data";
import {
  partnerRestaurantKpiSummaryDefaults,
  partnerRestaurantStatsDefaults,
} from "@/lib/query-defaults";
import {
  Kpi,
  KpiSummary,
  PaymentMethodFilter,
  StatRange,
  StatsWithFilters,
} from "@/types";

type PartnerStatsProviderProps = {
  children: React.ReactNode;
};

type PartnerStatsContext = {
  range: StatRange;
  activeKpi: Kpi;
  paymentMethod: PaymentMethodFilter;
  statsData: StatsWithFilters;
  isLoadingStats: boolean;
  year: Record<Kpi, number>;
  kpiSummary: KpiSummary;
  isLoadingKpiSummary: boolean;
  setRange: React.Dispatch<React.SetStateAction<StatRange>>;
  setActiveKpi: React.Dispatch<React.SetStateAction<Kpi>>;
  setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethodFilter>>;
  setYear: React.Dispatch<React.SetStateAction<Record<Kpi, number>>>;
};

export const PartnerStatsContext = createContext<PartnerStatsContext | null>(
  null,
);

export default function PartnerStatsProvider({
  children,
}: PartnerStatsProviderProps) {
  const { restaurant } = usePartnerRestaurant();

  const [searchParams, setSearchParams] = useSearchParams();
  const [range, setRange] = useState<StatRange>("all");
  const [activeKpi, setActiveKpi] = useState<Kpi>("accepted_orders");
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodFilter>("all");
  const [year, setYear] = useState<Record<Kpi, number>>({
    accepted_orders: new Date().getFullYear(),
    revenue: new Date().getFullYear(),
    rejected_orders: new Date().getFullYear(),
    lost_revenue: new Date().getFullYear(),
  });

  const {
    data: kpiSummary = partnerRestaurantKpiSummaryDefaults,
    isLoading: isLoadingKpiSummary,
  } = useGetPartnerRestaurantKpiSummary({
    restaurantId: restaurant.id,
    range,
    paymentMethod,
    year: year[activeKpi],
  });

  const {
    data: statsData = partnerRestaurantStatsDefaults,
    isLoading: isLoadingStats,
  } = useGetPartnerRestaurantStats({
    restaurantId: restaurant.id,
    kpi: activeKpi,
    range,
    paymentMethod,
    year: year[activeKpi],
  });

  useEffect(() => {
    const range = searchParams.get("range");

    if (range) {
      const matchedRange = statRanges.find((r) => r.value === range);

      setRange(matchedRange?.value || "all");
    }
  }, [searchParams]);

  useEffect(() => {
    const kpi = searchParams.get("kpi") as Kpi | null;

    if (kpi && kpiKeys.includes(kpi)) {
      setActiveKpi(kpi);
    } else {
      setActiveKpi("accepted_orders");
      setSearchParams({
        ...Object.fromEntries(searchParams),
        kpi: "accepted_orders",
      });
    }
  }, [searchParams, setSearchParams]);

  return (
    <PartnerStatsContext.Provider
      value={{
        range,
        activeKpi,
        paymentMethod,
        statsData,
        isLoadingStats,
        year,
        kpiSummary,
        isLoadingKpiSummary,
        setRange,
        setActiveKpi,
        setPaymentMethod,
        setYear,
      }}
    >
      {children}
    </PartnerStatsContext.Provider>
  );
}

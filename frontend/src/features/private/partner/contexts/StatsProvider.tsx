import { createContext, useContext, useEffect, useState } from "react";

import { useGetKpiSummary } from "@partner/hooks/restaurants/stats/useGetKpiSummary";
import { useGetStats } from "@partner/hooks/restaurants/stats/useGetStats";
import {
  PaymentMethodFilter,
  StatRangeWithAll,
} from "@partner/types/stats/stats.types";
import { useSearchParams } from "react-router-dom";

import { useRestaurant } from "./RestaurantProvider";

import {
  GetPartnerKpiSummary200,
  GetPartnerRestaurantStats200,
  Kpi,
  StatRange,
} from "@/api/models";
import { statRanges } from "@/features/private/partner/lib/data/stats.data";

type StatsProviderProps = {
  children: React.ReactNode;
};

type StatsContext = {
  range: StatRangeWithAll;
  activeKpi: Kpi;
  paymentMethod: PaymentMethodFilter;
  statsData?: GetPartnerRestaurantStats200;
  isLoadingStats: boolean;
  statsError: Error | null;
  year: Record<Kpi, number>;
  kpiSummary?: GetPartnerKpiSummary200;
  kpiSummaryError: Error | null;
  isLoadingKpiSummary: boolean;
  setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethodFilter>>;
  setYear: React.Dispatch<React.SetStateAction<Record<Kpi, number>>>;
};

const StatsContext = createContext<StatsContext | null>(null);

const kpiKeys: Kpi[] = [
  "accepted_orders",
  "revenue",
  "rejected_orders",
  "lost_revenue",
];

export default function StatsProvider({ children }: StatsProviderProps) {
  const { restaurantData } = useRestaurant();

  const [searchParams, setSearchParams] = useSearchParams();
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodFilter>("all");
  const [year, setYear] = useState<Record<Kpi, number>>({
    accepted_orders: new Date().getFullYear(),
    revenue: new Date().getFullYear(),
    rejected_orders: new Date().getFullYear(),
    lost_revenue: new Date().getFullYear(),
  });

  const rangeParam = searchParams.get("range") as StatRange | null;
  const kpiParam = searchParams.get("kpi") as Kpi | null;

  const range: StatRangeWithAll =
    statRanges.find((r) => r.value === rangeParam)?.value || "all";

  const activeKpi: Kpi =
    kpiParam && kpiKeys.includes(kpiParam) ? kpiParam : "accepted_orders";

  useEffect(() => {
    if (!kpiParam) {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        kpi: "accepted_orders",
      });
    }
  }, [kpiParam, searchParams, setSearchParams]);

  const {
    data: kpiSummary,
    isLoading: isLoadingKpiSummary,
    error: kpiSummaryError,
  } = useGetKpiSummary({
    restaurantId: restaurantData.data.id,
    range,
    paymentMethod,
    year: year[activeKpi],
  });

  const {
    data: statsData,
    isLoading: isLoadingStats,
    error: statsError,
  } = useGetStats({
    restaurantId: restaurantData.data.id,
    kpi: activeKpi,
    range,
    paymentMethod,
    year: year[activeKpi],
  });

  return (
    <StatsContext.Provider
      value={{
        range,
        activeKpi,
        paymentMethod,
        statsData,
        isLoadingStats,
        statsError,
        year,
        kpiSummary,
        isLoadingKpiSummary,
        kpiSummaryError,
        setPaymentMethod,
        setYear,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
}

export function useStats() {
  const context = useContext(StatsContext);

  if (!context) {
    throw new Error("useStats must be used within a StatsProvider.");
  }

  return context;
}

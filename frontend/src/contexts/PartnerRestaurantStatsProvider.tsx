import { createContext, useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { kpiKeys, statRanges } from "@/lib/data";
import { Kpi, StatRange } from "@/types";

type PartnerRestaurantStatsProviderProps = {
  children: React.ReactNode;
};

type PartnerRestaurantStatsContext = {
  range: StatRange;
  activeKpi: Kpi;
  setRange: React.Dispatch<React.SetStateAction<StatRange>>;
  setActiveKpi: React.Dispatch<React.SetStateAction<Kpi>>;
};

export const PartnerRestaurantStatsContext =
  createContext<PartnerRestaurantStatsContext | null>(null);

export default function PartnerRestaurantStatsProvider({
  children,
}: PartnerRestaurantStatsProviderProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [range, setRange] = useState<StatRange>("all");
  const [activeKpi, setActiveKpi] = useState<Kpi>("accepted_orders");

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
    <PartnerRestaurantStatsContext.Provider
      value={{
        range,
        activeKpi,
        setRange,
        setActiveKpi,
      }}
    >
      {children}
    </PartnerRestaurantStatsContext.Provider>
  );
}

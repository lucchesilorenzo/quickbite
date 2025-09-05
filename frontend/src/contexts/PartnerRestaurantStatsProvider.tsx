import { createContext, useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { statRanges } from "@/lib/data";
import { StatRange } from "@/types";

type PartnerRestaurantStatsProviderProps = {
  children: React.ReactNode;
};

type PartnerRestaurantStatsContext = {
  range: StatRange;
  setRange: React.Dispatch<React.SetStateAction<StatRange>>;
};

export const PartnerRestaurantStatsContext =
  createContext<PartnerRestaurantStatsContext | null>(null);

export default function PartnerRestaurantStatsProvider({
  children,
}: PartnerRestaurantStatsProviderProps) {
  const [searchParams] = useSearchParams();
  const [range, setRange] = useState<StatRange>("all");

  useEffect(() => {
    const range = searchParams.get("range");

    if (range) {
      const matchedRange = statRanges.find((r) => r.value === range);

      setRange(matchedRange?.value || "all");
    }
  }, [searchParams]);

  return (
    <PartnerRestaurantStatsContext.Provider value={{ range, setRange }}>
      {children}
    </PartnerRestaurantStatsContext.Provider>
  );
}

import { format, subDays } from "date-fns";

import { StatRange } from "@/features/private/partner/types/stat.types";

export function getComputedRangeLabel(range: StatRange) {
  const today = new Date();

  if (range === "all") {
    return "for all time";
  }

  const ranges: Record<string, number> = {
    "7d": 7,
    "14d": 14,
    "30d": 30,
  };

  const days = ranges[range];
  if (!days) return "";

  const from = subDays(today, days);

  return `from ${format(from, "d MMM")} - ${format(today, "d MMM")}`;
}

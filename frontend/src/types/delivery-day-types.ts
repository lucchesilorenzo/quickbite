export type DeliveryDay = {
  id: string;
  restaurant_id: string;
  day:
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY";
  start_time: string | null;
  end_time: string | null;
  created_at: string;
  updated_at: string;
};

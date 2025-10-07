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

export type DeliverySlots = {
  is_asap_available: boolean;
  delivery_slots: string[];
};

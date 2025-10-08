import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { usePartnerRestaurantOrders } from "@/hooks/contexts/private/partner/usePartnerRestaurantOrders";
import { orderStatuses } from "@/lib/data";
import { OrderStatusWithAll } from "@/types/order-types";

type OrdersFiltersProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function OrdersFilters({ setPage }: OrdersFiltersProps) {
  const { status, setStatus } = usePartnerRestaurantOrders();

  const [, setSearchParams] = useSearchParams();

  function handleStatusChange(e: SelectChangeEvent<OrderStatusWithAll>) {
    setStatus(e.target.value);

    setSearchParams({
      status: e.target.value !== "all" ? e.target.value : [],
      page: [],
    });

    setPage(1);
  }

  return (
    <Box>
      <Select
        size="small"
        sx={{ width: 200 }}
        value={status}
        onChange={handleStatusChange}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 200,
            },
          },
        }}
      >
        <MenuItem value="all" selected={status === "all"}>
          All
        </MenuItem>

        {Object.values(orderStatuses).map(({ value, label }) => (
          <MenuItem key={value} value={value} selected={status === value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

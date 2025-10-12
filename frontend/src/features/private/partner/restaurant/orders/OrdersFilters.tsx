import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { usePartnerOrders } from "@partner/contexts/PartnerOrdersProvider";
import { OrderStatusWithAll } from "@private/types/order-types";
import { useSearchParams } from "react-router-dom";

import { orderStatuses } from "@/lib/constants/orders";

type OrdersFiltersProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function OrdersFilters({ setPage }: OrdersFiltersProps) {
  const { status, setStatus } = usePartnerOrders();

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

import { useState } from "react";

import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Popover,
  Select,
  Stack,
  Tooltip,
} from "@mui/material";
import { useUpdateOrderStatus } from "@partner/hooks/restaurants/orders/useUpdateOrderStatus";
import { getDisabledOrderStatuses } from "@partner/lib/utils/orders";
import { Order, OrderStatus } from "@private/types/order-types";

import { orderStatuses } from "@/lib/constants/orders";

type UpdateOrderStatusButtonProps = {
  order: Order;
};

export default function UpdateOrderStatusButton({
  order,
}: UpdateOrderStatusButtonProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [status, setStatus] = useState(order.status);

  const { mutateAsync: updateOrderStatus, isPending: isOrderStatusUpdating } =
    useUpdateOrderStatus(order.id);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(e.currentTarget);
  }

  async function handleConfirm() {
    await updateOrderStatus({ status });
    setAnchorEl(null);
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleClick}
      >
        Update status
      </Button>

      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Box sx={{ p: 2, minWidth: 300 }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Select
              fullWidth
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                  },
                },
              }}
            >
              {Object.values(orderStatuses).map(({ value, label }) => (
                <MenuItem
                  disabled={getDisabledOrderStatuses(status).includes(
                    value as OrderStatus,
                  )}
                  key={value}
                  value={value}
                  selected={value === order.status}
                >
                  {label}
                </MenuItem>
              ))}
            </Select>

            <Tooltip title="Reset">
              <Box component="span">
                <IconButton onClick={() => setStatus(order.status)}>
                  <RestartAltOutlinedIcon />
                </IconButton>
              </Box>
            </Tooltip>
          </Stack>

          <Button
            variant="contained"
            onClick={handleConfirm}
            disabled={status === order.status || isOrderStatusUpdating}
            loading={isOrderStatusUpdating}
            loadingIndicator="Updating..."
            sx={{ mt: 2 }}
            fullWidth
          >
            Confirm
          </Button>
        </Box>
      </Popover>
    </>
  );
}

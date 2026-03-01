import { useState } from "react";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
  Tooltip,
} from "@mui/material";
import { orderStatuses, statusTransitions } from "@rider/lib/data/orders.data";
import { OrderStatus } from "@rider/types/orders/order.types";

import { useUpdateDeliveryStatus } from "../hooks/restaurant/deliveries/useUpdateDeliveryStatus";
import { Delivery, DeliveryStatus } from "../types/deliveries/delivery.types";

type SplitButtonProps = {
  delivery: Delivery;
};

export default function SplitButton({ delivery }: SplitButtonProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(
    delivery.order.status,
  );

  const { mutate: updateDeliveryStatus, isPending: isUpdating } =
    useUpdateDeliveryStatus({ deliveryId: delivery.id, setSelectedStatus });

  const allowedStatuses = statusTransitions[selectedStatus];

  function handleStatusClick() {
    updateDeliveryStatus({
      status: orderStatuses[selectedStatus].value as DeliveryStatus,
    });
  }

  function handleMenuItemClick(status: OrderStatus) {
    setSelectedStatus(status);
    setAnchorEl(null);
  }

  return (
    <Box sx={{ alignSelf: "baseline" }}>
      {delivery.order.status !== "delivered" &&
      delivery.order.status !== "cancelled" ? (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Reset">
            <Box component="span">
              <IconButton
                onClick={() => setSelectedStatus(delivery.order.status)}
              >
                <RestartAltOutlinedIcon />
              </IconButton>
            </Box>
          </Tooltip>

          <ButtonGroup variant="contained">
            <Button
              color="primary"
              onClick={handleStatusClick}
              loading={isUpdating}
              loadingIndicator="Updating..."
            >
              {orderStatuses[selectedStatus].label}
            </Button>

            <Button
              size="small"
              disabled={!allowedStatuses.length}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
        </Stack>
      ) : (
        <Chip label={orderStatuses[selectedStatus].label} color="primary" />
      )}

      <Popper
        open={!!anchorEl}
        anchorEl={anchorEl}
        transition
        disablePortal
        sx={{ zIndex: 1 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                <MenuList>
                  {allowedStatuses.map((status) => (
                    <MenuItem
                      key={status}
                      selected={status === selectedStatus}
                      onClick={() => handleMenuItemClick(status as OrderStatus)}
                    >
                      {orderStatuses[status].label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}

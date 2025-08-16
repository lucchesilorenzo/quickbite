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

import { orderStatuses } from "@/lib/data";
import { getDisabledOrderStatuses } from "@/lib/utils";
import { OrderStatus } from "@/types/order-types";

type UpdateOrderStatusButtonProps = {
  currentStatus: OrderStatus;
};

export default function UpdateOrderStatusButton({
  currentStatus,
}: UpdateOrderStatusButtonProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [status, setStatus] = useState(currentStatus);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(e.currentTarget);
  }

  async function handleConfirm() {
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
              {Object.entries(orderStatuses).map(([key, { label }]) => (
                <MenuItem
                  disabled={getDisabledOrderStatuses(status).includes(
                    key as OrderStatus,
                  )}
                  key={key}
                  value={key}
                  selected={key === currentStatus}
                >
                  {label}
                </MenuItem>
              ))}
            </Select>

            <Tooltip title="Reset">
              <Box component="span">
                <IconButton onClick={() => setStatus(currentStatus)}>
                  <RestartAltOutlinedIcon />
                </IconButton>
              </Box>
            </Tooltip>
          </Stack>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </Box>
      </Popover>
    </>
  );
}

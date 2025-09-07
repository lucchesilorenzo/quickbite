import { useState } from "react";

import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";

import { paymentMethodOptions } from "@/lib/data";
import { PaymentMethodFilter } from "@/types";

export default function ParnerStatsDetailsAcceptedOrdersSelect() {
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodFilter>("all");

  function handlePaymentChange(e: SelectChangeEvent<PaymentMethodFilter>) {
    setPaymentMethod(e.target.value);
  }

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        Show
      </Typography>

      <Select
        size="small"
        sx={{ width: 200 }}
        value={paymentMethod}
        onChange={handlePaymentChange}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 200,
            },
          },
        }}
      >
        {paymentMethodOptions.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
}

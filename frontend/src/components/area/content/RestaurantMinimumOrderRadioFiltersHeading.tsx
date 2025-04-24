import { useState } from "react";

import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import {
  ClickAwayListener,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

export default function RestaurantMinimumOrderRadioFiltersHeading() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      <Typography component="span" variant="h6" sx={{ fontWeight: "700" }}>
        Minimum order amount
      </Typography>

      <ClickAwayListener onClickAway={() => setShowTooltip(false)}>
        <Tooltip
          placement="top"
          title="This is the least amount you need to spend to place an order. Fees are not included."
          open={showTooltip}
          onClose={() => setShowTooltip(false)}
          disableFocusListener
          disableHoverListener
          disableTouchListener
        >
          <IconButton
            color="primary"
            onClick={() => setShowTooltip(!showTooltip)}
          >
            <InfoOutlineIcon />
          </IconButton>
        </Tooltip>
      </ClickAwayListener>
    </Stack>
  );
}

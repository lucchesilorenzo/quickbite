import { useState } from "react";

import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import {
  ClickAwayListener,
  IconButton,
  Stack,
  Tooltip,
  TooltipProps,
  Typography,
} from "@mui/material";

type HeadingWithTooltipProps = {
  headingText: string;
  tooltipMessage: string;
  placement?: TooltipProps["placement"];
};

export default function HeadingWithTooltip({
  headingText,
  tooltipMessage,
  placement = "top",
}: HeadingWithTooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      <Typography component="span" variant="h6" sx={{ fontWeight: 700 }}>
        {headingText}
      </Typography>

      <ClickAwayListener onClickAway={() => setShowTooltip(false)}>
        <Tooltip
          placement={placement}
          title={tooltipMessage}
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

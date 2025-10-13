import { Box } from "@mui/material";

import FeesFormCard from "./FeesFormCard";
import FeesHeader from "./FeesHeader";

export default function FeesContainer() {
  return (
    <Box>
      <FeesHeader />
      <FeesFormCard />
    </Box>
  );
}

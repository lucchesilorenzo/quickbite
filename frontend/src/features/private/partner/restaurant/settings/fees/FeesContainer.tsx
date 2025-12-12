import { Box } from "@mui/material";

import FeesFormCard from "./FeesFormCard";
import FeesHeader from "./FeesHeader";

type FeesContainerProps = {
  isUpdating: boolean;
};

export default function FeesContainer({ isUpdating }: FeesContainerProps) {
  return (
    <Box>
      <FeesHeader isUpdating={isUpdating} />
      <FeesFormCard />
    </Box>
  );
}

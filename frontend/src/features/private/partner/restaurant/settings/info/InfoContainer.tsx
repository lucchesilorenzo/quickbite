import { Box } from "@mui/material";
import InfoFormCard from "@partner/restaurant/settings/info/InfoFormCard";
import InfoHeader from "@partner/restaurant/settings/info/InfoHeader";

type InfoContainerProps = {
  isUpdating: boolean;
};

export default function InfoContainer({ isUpdating }: InfoContainerProps) {
  return (
    <Box>
      <InfoHeader isUpdating={isUpdating} />
      <InfoFormCard />
    </Box>
  );
}

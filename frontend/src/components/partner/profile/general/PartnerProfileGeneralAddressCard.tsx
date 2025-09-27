import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Card } from "@mui/material";

import PartnerCardHeading from "../common/PartnerCardHeading";
import PartnerProfileGeneralAddressForm from "./PartnerProfileGeneralAddressForm";

export default function PartnerProfileGeneralAddressCard() {
  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <PartnerCardHeading
        title="Address"
        description="Your address details"
        icon={HomeOutlinedIcon}
      />

      <PartnerProfileGeneralAddressForm />
    </Card>
  );
}

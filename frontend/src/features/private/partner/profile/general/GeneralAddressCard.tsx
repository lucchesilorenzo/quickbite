import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Card } from "@mui/material";

import CardHeading from "../common/CardHeading";
import GeneralAddressForm from "./GeneralAddressForm";

export default function GeneralAddressCard() {
  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <CardHeading
        title="Address"
        description="Your address details"
        icon={HomeOutlinedIcon}
      />

      <GeneralAddressForm />
    </Card>
  );
}

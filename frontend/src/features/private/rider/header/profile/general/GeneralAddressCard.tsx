import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Card } from "@mui/material";

import GeneralAddressForm from "./GeneralAddressForm";

import CardHeading from "@/components/common/CardHeading/CardHeading";

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

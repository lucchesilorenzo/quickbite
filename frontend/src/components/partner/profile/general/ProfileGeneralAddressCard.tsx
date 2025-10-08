import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Card } from "@mui/material";

import CardHeading from "../common/CardHeading";
import ProfileGeneralAddressForm from "./ProfileGeneralAddressForm";

export default function ProfileGeneralAddressCard() {
  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <CardHeading
        title="Address"
        description="Your address details"
        icon={HomeOutlinedIcon}
      />

      <ProfileGeneralAddressForm />
    </Card>
  );
}

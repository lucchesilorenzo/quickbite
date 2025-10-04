import { Container } from "@mui/material";

import PartnerLoginFormContainer from "../PartnerLoginFormContainer";

export default function PartnerLoginLayoutMobile() {
  return (
    <Container
      component="main"
      sx={{ display: { xs: "block", lg: "none" } }}
      maxWidth="md"
    >
      <PartnerLoginFormContainer />
    </Container>
  );
}

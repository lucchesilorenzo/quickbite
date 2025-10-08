import { Container } from "@mui/material";

import LoginFormContainer from "../LoginFormContainer";

export default function LoginLayoutMobile() {
  return (
    <Container
      component="main"
      sx={{ display: { xs: "block", lg: "none" } }}
      maxWidth="md"
    >
      <LoginFormContainer />
    </Container>
  );
}

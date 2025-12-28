import { Container } from "@mui/material";

import JobPostCountAndSort from "../JobPostCountAndSort";
import JobPostList from "../JobPostList";

export default function JobPostsLayoutMobile() {
  return (
    <Container maxWidth="md" sx={{ my: 3 }}>
      <JobPostCountAndSort />
      <JobPostList />
    </Container>
  );
}

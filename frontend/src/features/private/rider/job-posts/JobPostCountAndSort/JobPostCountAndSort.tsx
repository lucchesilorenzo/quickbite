import { Box, Link, Stack, Typography } from "@mui/material";
import { useJobPosts } from "@rider/contexts/JobPostsProvider";

export default function JobPostCountAndSort() {
  const { jobPostPages, sortBy, handleApplySort } = useJobPosts();

  const isAsc = sortBy === "asc";
  const isDesc = sortBy === "desc";

  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        component="h1"
        variant="body2"
        color="textSecondary"
        sx={{ mb: 2 }}
      >
        Search results
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Stack direction="row" spacing={1}>
          <Typography variant="body2">Sort by:</Typography>

          <Link
            component="button"
            color={isDesc ? "inherit" : "info"}
            underline={isDesc ? "none" : "hover"}
            variant="body2"
            onClick={() => handleApplySort("desc")}
            sx={{
              textTransform: "lowercase",
              fontWeight: isDesc ? 500 : undefined,
              cursor: isDesc ? "default" : "pointer",
            }}
          >
            Latest
          </Link>

          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontWeight: 500 }}
          >
            -
          </Typography>

          <Link
            component="button"
            color={isAsc ? "inherit" : "info"}
            underline={isAsc ? "none" : "hover"}
            variant="body2"
            onClick={() => handleApplySort("asc")}
            sx={{
              textTransform: "lowercase",
              fontWeight: isAsc ? 500 : undefined,
              cursor: isAsc ? "default" : "pointer",
            }}
          >
            Oldest
          </Link>
        </Stack>

        {jobPostPages && jobPostPages.length > 0 && (
          <Box>
            <Typography variant="body2" color="textSecondary">
              {jobPostPages.length} job posts
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );
}

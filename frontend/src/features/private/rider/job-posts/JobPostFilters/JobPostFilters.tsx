import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  MAX_SALARY,
  MIN_SALARY,
  employmentTypes,
} from "@private/shared/lib/constants/job-posts";
import { EmploymentTypeWithAll } from "@private/shared/types/job-posts/job-post.types";
import { useJobPosts } from "@rider/contexts/JobPostsProvider";
import { useSearchParams } from "react-router-dom";

import { formatCurrency } from "@/lib/utils/formatting";

export default function JobPostFilters() {
  const {
    searchQuery,
    salaryRange,
    employmentType,
    setSearchQuery,
    setSalaryRange,
    setEmploymentType,
  } = useJobPosts();

  const [, setSearchParams] = useSearchParams();

  function applyFilters() {
    const shouldApplySalaryFilter =
      (salaryRange[0] !== MIN_SALARY && salaryRange[1] !== MAX_SALARY) ||
      salaryRange[0] !== salaryRange[1];

    setSearchParams((prev) => ({
      ...Object.fromEntries(prev),
      search: searchQuery !== "" ? searchQuery : [],
      min_salary: shouldApplySalaryFilter ? salaryRange[0].toString() : [],
      max_salary: shouldApplySalaryFilter ? salaryRange[1].toString() : [],
      employment_type: employmentType !== "all" ? employmentType : [],
    }));
  }

  function resetFilters() {
    setSearchQuery("");
    setSalaryRange([MIN_SALARY, MAX_SALARY]);
    setEmploymentType("all");
    setSearchParams({});
  }

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        sx={{ alignItems: "center" }}
      >
        <TextField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Title"
          size="small"
          sx={{ minWidth: 150 }}
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="clear"
                    onClick={() => setSearchQuery("")}
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Box sx={{ minWidth: 250, width: 1 }}>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            Salary
          </Typography>

          <Slider
            data-testid="slider"
            value={salaryRange}
            onChange={(_, v) => setSalaryRange(v as number[])}
            min={MIN_SALARY}
            max={MAX_SALARY}
            step={1000}
            size="small"
            valueLabelDisplay="auto"
            getAriaValueText={(v) => formatCurrency(v)}
          />
        </Box>

        <FormControl fullWidth size="small">
          <InputLabel id="employment-type-label">Employment type</InputLabel>

          <Select
            labelId="employment-type-label"
            label="Employment type"
            value={employmentType}
            onChange={(e) =>
              setEmploymentType(e.target.value as EmploymentTypeWithAll)
            }
          >
            <MenuItem value="all">All</MenuItem>

            {employmentTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <ButtonGroup
          variant="contained"
          aria-label="Job post filter buttons"
          fullWidth
        >
          <Button onClick={applyFilters}>Apply</Button>
          <Button
            sx={{
              bgcolor: "#eeee",
              color: "#212121",
              "&:hover": { bgcolor: "#e0e0e0" },
            }}
            onClick={resetFilters}
          >
            Reset
          </Button>
        </ButtonGroup>
      </Stack>
    </Paper>
  );
}

import { useState } from "react";

import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  Stack,
  TextField,
} from "@mui/material";
import { EmploymentTypeWithAll } from "@private/shared/types/job-posts/job-post.types";
import { useJobPosts } from "@rider/contexts/JobPostsProvider";
import { useSearchParams } from "react-router-dom";

import {
  MAX_SALARY,
  MIN_SALARY,
  employmentTypes,
} from "@/features/private/shared/lib/data/job-posts.data";
import { formatCurrency } from "@/lib/utils/formatting";

export default function JobPostFilters() {
  const [, setSearchParams] = useSearchParams();
  const { filters } = useJobPosts();

  const [search, setSearch] = useState(filters.search);
  const [salary, setSalary] = useState([filters.minSalary, filters.maxSalary]);
  const [salaryEnabled, setSalaryEnabled] = useState(filters.salaryEnabled);
  const [employmentType, setEmploymentType] = useState<EmploymentTypeWithAll>(
    filters.employmentType,
  );

  function handleApplyFilters() {
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev),
      job_post_id: [],
      search: search || [],
      min_salary: salaryEnabled ? salary[0].toString() : [],
      max_salary: salaryEnabled ? salary[1].toString() : [],
      employment_type: employmentType !== "all" ? employmentType : [],
    }));
  }

  function handleResetFilters() {
    setSearch("");
    setSalary([MIN_SALARY, MAX_SALARY]);
    setSalaryEnabled(false);
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
              endAdornment: search && (
                <InputAdornment position="end">
                  <IconButton aria-label="clear" onClick={() => setSearch("")}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Box sx={{ minWidth: 250, width: 1 }}>
          <Box sx={{ textAlign: "center" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={salaryEnabled}
                  onChange={(e) => setSalaryEnabled(e.target.checked)}
                />
              }
              label="Filter by salary"
            />
          </Box>

          <Slider
            data-testid="slider"
            disabled={!salaryEnabled}
            value={salary}
            onChange={(_, v) => setSalary(v as number[])}
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
          aria-label="job post filter buttons"
          fullWidth
        >
          <Button onClick={handleApplyFilters}>Apply</Button>

          <Button
            sx={{
              bgcolor: "#eeee",
              color: "#212121",
              "&:hover": { bgcolor: "#e0e0e0" },
            }}
            onClick={handleResetFilters}
          >
            Reset
          </Button>
        </ButtonGroup>
      </Stack>
    </Paper>
  );
}

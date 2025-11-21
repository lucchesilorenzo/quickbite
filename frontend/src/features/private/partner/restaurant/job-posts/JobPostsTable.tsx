import { useState } from "react";

import PlusIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Chip, IconButton, Stack } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useRestaurant } from "@partner/contexts/RestaurantProvider";

import { useGetJobPosts } from "../../hooks/restaurants/job-posts/useGetJobPosts";
import { jobPostsDefaults } from "../../lib/query-defaults";
import AddJobPostDialog from "./AddJobPostDialog";

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: ({ value }) => (
      <Chip
        label={value === "open" ? "Open" : "Closed"}
        color={value === "open" ? "success" : "error"}
        size="small"
      />
    ),
  },
  {
    field: "applicationsCount",
    headerName: "Applications count",
    width: 200,
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 200,
    filterable: false,
    sortable: false,
    disableExport: true,
    disableColumnMenu: true,
    hideSortIcons: true,
    type: "actions",
    renderCell: () => (
      <>
        <IconButton size="small" color="primary">
          <EditIcon />
        </IconButton>

        <IconButton size="small" color="error">
          <DeleteIcon />
        </IconButton>
      </>
    ),
  },
];

export default function JobPostsTable() {
  const [openAddJobPostDialog, setOpenAddJobPostDialog] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });

  const { restaurant } = useRestaurant();
  const { data: jobPosts = jobPostsDefaults, isLoading: isLoadingJobPosts } =
    useGetJobPosts(
      restaurant.id,
      paginationModel.page,
      paginationModel.pageSize,
    );

  const rows: GridRowsProp = jobPosts.data.map((jobPost) => ({
    id: jobPost.id,
    title: jobPost.title,
    status: jobPost.status,
    applicationsCount: jobPost.job_applications_count,
  }));

  return (
    <Stack spacing={2}>
      <Box>
        <Button
          variant="contained"
          startIcon={<PlusIcon />}
          onClick={() => setOpenAddJobPostDialog(true)}
        >
          Add job post
        </Button>
      </Box>

      <Stack>
        <DataGrid
          initialState={{
            pagination: {
              paginationModel: { pageSize: 25, page: 0 },
            },
          }}
          paginationMode="server"
          rowCount={jobPosts.total}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          loading={isLoadingJobPosts}
          rows={rows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          showToolbar
          ignoreDiacritics
        />
      </Stack>

      <AddJobPostDialog
        openAddJobPostDialog={openAddJobPostDialog}
        setOpenAddJobPostDialog={setOpenAddJobPostDialog}
      />
    </Stack>
  );
}

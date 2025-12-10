import { useState } from "react";

import PlusIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Chip, IconButton, Stack } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRowSelectionModel,
  GridRowsProp,
  GridSortModel,
} from "@mui/x-data-grid";
import { useRestaurant } from "@partner/contexts/RestaurantProvider";
import { useGetJobPosts } from "@partner/hooks/restaurants/job-posts/useGetJobPosts";
import { jobPostsDefaults } from "@partner/lib/query-defaults";
import { useNotifications } from "@toolpad/core/useNotifications";

import AddJobPostDialog from "../AddJobPostDialog";
import DeleteJobPostDialog from "../DeleteJobPostDialog";
import DeleteJobPostsDialog from "../DeleteJobPostsDialog";
import EditJobPostDialog from "../EditJobPostDialog";

export default function JobPostsTable() {
  const [openAddJobPostDialog, setOpenAddJobPostDialog] = useState(false);
  const [openEditJobPostDialog, setOpenEditJobPostDialog] = useState(false);
  const [openDeleteJobPostDialog, setOpenDeleteJobPostDialog] = useState(false);
  const [openDeleteJobPostsDialog, setOpenDeleteJobPostsDialog] =
    useState(false);
  const [selectedJobPostId, setSelectedJobPostId] = useState<string | null>(
    null,
  );
  const [selectedJobPosts, setSelectedJobPosts] =
    useState<GridRowSelectionModel>();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });

  const notifications = useNotifications();

  const { restaurant } = useRestaurant();

  const {
    data: jobPostsData = {
      success: false,
      message: "",
      job_posts: jobPostsDefaults,
    },
    isLoading: isLoadingJobPosts,
    error: jobPostsError,
  } = useGetJobPosts({
    restaurantId: restaurant.id,
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
    sortBy: sortModel,
    filters: filterModel,
  });

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
      field: "applications_count",
      headerName: "Applications count",
      width: 200,
      filterable: false,
      sortable: false,
      disableExport: true,
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
      renderCell: ({ row }) => (
        <>
          <IconButton
            aria-label="edit"
            size="small"
            color="primary"
            onClick={() => {
              setSelectedJobPostId(row.id);
              setOpenEditJobPostDialog(true);
            }}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            aria-label="delete"
            size="small"
            color="error"
            onClick={() => {
              setSelectedJobPostId(row.id);
              setOpenDeleteJobPostDialog(true);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const rows: GridRowsProp = jobPostsData.job_posts.data.map((jobPost) => ({
    id: jobPost.id,
    title: jobPost.title,
    status: jobPost.status,
    applications_count: jobPost.job_applications_count,
  }));

  if (jobPostsError) {
    notifications.show(jobPostsError.message, {
      key: "partner-get-job-posts-error",
      severity: "error",
    });
  }

  return (
    <Stack spacing={2} sx={{ my: 2 }}>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          startIcon={<PlusIcon />}
          onClick={() => setOpenAddJobPostDialog(true)}
        >
          Add job post
        </Button>

        {selectedJobPosts?.ids && selectedJobPosts.ids.size > 1 && (
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => setOpenDeleteJobPostsDialog(true)}
          >
            Delete job posts
          </Button>
        )}
      </Stack>

      <Stack>
        <DataGrid
          aria-label="job-posts-table"
          sx={{
            "& .MuiDataGrid-cell:focus": { outline: "none" },
            "& .MuiDataGrid-cell:focus-within": { outline: "none" },
          }}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 25, page: 0 },
            },
          }}
          paginationMode="server"
          sortingMode="server"
          filterMode="server"
          rowCount={jobPostsData.job_posts.total}
          paginationModel={paginationModel}
          sortModel={sortModel}
          filterModel={filterModel}
          onPaginationModelChange={setPaginationModel}
          onSortModelChange={setSortModel}
          onFilterModelChange={setFilterModel}
          onRowSelectionModelChange={(rows) => setSelectedJobPosts(rows)}
          loading={isLoadingJobPosts}
          rows={rows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          disableRowSelectionExcludeModel
          showToolbar
          ignoreDiacritics
        />
      </Stack>

      <AddJobPostDialog
        openAddJobPostDialog={openAddJobPostDialog}
        setOpenAddJobPostDialog={setOpenAddJobPostDialog}
      />

      <EditJobPostDialog
        jobPostId={selectedJobPostId}
        openEditJobPostDialog={openEditJobPostDialog}
        setOpenEditJobPostDialog={setOpenEditJobPostDialog}
      />

      <DeleteJobPostDialog
        jobPostId={selectedJobPostId}
        openDeleteJobPostDialog={openDeleteJobPostDialog}
        setOpenDeleteJobPostDialog={setOpenDeleteJobPostDialog}
      />

      <DeleteJobPostsDialog
        jobPostIds={selectedJobPosts?.ids}
        openDeleteJobPostsDialog={openDeleteJobPostsDialog}
        setOpenDeleteJobPostsDialog={setOpenDeleteJobPostsDialog}
      />
    </Stack>
  );
}

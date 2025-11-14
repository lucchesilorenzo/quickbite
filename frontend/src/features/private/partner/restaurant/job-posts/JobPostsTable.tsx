import { useState } from "react";

import PlusIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Chip, IconButton, Stack } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

import AddJobPostDialog from "./AddJobPostDialog";

const rows: GridRowsProp = [
  {
    id: 1,
    title: "Frontend developer",
    status: "open",
    applicationsCount: 10,
  },
  {
    id: 2,
    title: "Backend developer",
    status: "closed",
    applicationsCount: 5,
  },
];

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

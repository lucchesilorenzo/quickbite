import { useState } from "react";

import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import { Chip, ChipProps, IconButton, Stack, Tooltip } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRowsProp,
  GridSortModel,
} from "@mui/x-data-grid";
import { useNotifications } from "@toolpad/core/useNotifications";
import axios from "axios";
import { useParams } from "react-router-dom";

import { useGetJobApplications } from "../../hooks/restaurants/job-applications/useGetJobApplications";
import { jobApplicationsDefaults } from "../../lib/data/defaults/query.defaults";
import ConfirmJobApplicationDialog from "./ConfirmJobApplicationDialog";

import env from "@/lib/env";

export default function JobApplicationsTable() {
  const { jobPostId } = useParams();

  const [openConfirmJobApplicationDialog, setOpenConfirmJobApplicationDialog] =
    useState(false);
  const [selectedJobApplicationId, setSelectedJobApplicationId] = useState<
    string | null
  >(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });

  const notifications = useNotifications();

  const {
    data: jobApplicationsData = {
      success: false,
      message: "",
      job_applications: jobApplicationsDefaults,
    },
    isLoading: isLoadingJobApplications,
    error: jobApplicationsError,
  } = useGetJobApplications({
    jobPostId,
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
    sortBy: sortModel,
    filters: filterModel,
  });

  async function downloadResume(jobApplicationId: string) {
    try {
      const response = await axios.get<Blob>(
        `${env.VITE_BACKEND_URL}/api/v1/partner/job-applications/${jobApplicationId}/resume`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/pdf",
          },
          responseType: "blob",
        },
      );

      const url = URL.createObjectURL(response.data);

      const a = document.createElement("a");
      a.href = url;
      a.download =
        response.headers["content-disposition"].split("filename=")[1];
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(url);
    } catch {
      notifications.show("Failed to download resume.", {
        key: "download-resume-error",
        severity: "error",
      });
    }
  }

  const resumeStatuses: Record<
    string,
    { label: string; color: ChipProps["color"] }
  > = {
    pending: {
      label: "Pending",
      color: "default",
    },
    accepted: {
      label: "Accepted",
      color: "success",
    },
    rejected: {
      label: "Rejected",
      color: "error",
    },
  } as const;

  const columns: GridColDef[] = [
    {
      field: "first_name",
      headerName: "First name",
      width: 100,
    },
    {
      field: "last_name",
      headerName: "Last name",
      width: 100,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "phone_number",
      headerName: "Phone number",
      width: 200,
    },
    {
      field: "resume",
      headerName: "Resume",
      width: 100,
      renderCell: ({ row }) => (
        <Tooltip title="Download resume">
          <IconButton
            onClick={() => downloadResume(row.id)}
            aria-label="Download resume"
            size="small"
          >
            <UploadFileOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: ({ value }) => (
        <Chip
          label={resumeStatuses[value].label}
          color={resumeStatuses[value].color}
          size="small"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      filterable: false,
      sortable: false,
      disableExport: true,
      disableColumnMenu: true,
      hideSortIcons: true,
      type: "actions",
      renderCell: ({ row }) => {
        if (row.status === "accepted") {
          return <ThumbUpAltIcon fontSize="small" color="success" />;
        }

        if (row.status === "rejected") {
          return <ThumbDownAltIcon fontSize="small" color="error" />;
        }

        return (
          <Tooltip title="Confirm application">
            <IconButton
              aria-label="Confirm application"
              size="small"
              onClick={() => {
                setSelectedJobApplicationId(row.id);
                setOpenConfirmJobApplicationDialog(true);
              }}
            >
              <ThumbUpOffAltIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        );
      },
    },
  ];

  const rows: GridRowsProp = jobApplicationsData.job_applications.data.map(
    (jobApplication) => ({
      id: jobApplication.id,
      first_name: jobApplication.first_name,
      last_name: jobApplication.last_name,
      email: jobApplication.email,
      phone_number: jobApplication.phone_number,
      resume: jobApplication.resume,
      status: jobApplication.status,
    }),
  );

  if (jobApplicationsError) {
    notifications.show(jobApplicationsError.message, {
      key: "partner-job-applications-error",
      severity: "error",
    });
  }

  return (
    <Stack spacing={2} sx={{ my: 2 }}>
      <Stack>
        <DataGrid
          aria-label="Job applications table"
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
          rowCount={jobApplicationsData.job_applications.total}
          paginationModel={paginationModel}
          sortModel={sortModel}
          filterModel={filterModel}
          onPaginationModelChange={setPaginationModel}
          onSortModelChange={setSortModel}
          onFilterModelChange={setFilterModel}
          loading={isLoadingJobApplications}
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          disableRowSelectionExcludeModel
          showToolbar
          ignoreDiacritics
        />
      </Stack>

      <ConfirmJobApplicationDialog
        jobApplicationId={selectedJobApplicationId}
        openConfirmJobApplicationDialog={openConfirmJobApplicationDialog}
        setOpenConfirmJobApplicationDialog={setOpenConfirmJobApplicationDialog}
      />
    </Stack>
  );
}

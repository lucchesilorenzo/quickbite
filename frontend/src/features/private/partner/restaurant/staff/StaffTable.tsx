import { useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import PeopleIcon from "@mui/icons-material/People";
import { IconButton, Tooltip } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRowsProp,
  GridSortModel,
} from "@mui/x-data-grid";
import { useRestaurant } from "@partner/contexts/RestaurantProvider";
import { useNotifications } from "@toolpad/core/useNotifications";

import { useGetStaffMembers } from "../../hooks/restaurants/staff/useGetStaffMembers";
import DeleteStaffDialog from "./DeleteStaffDialog";
import ViewProfileDialog from "./ViewProfileDialog";

export default function StaffTable() {
  const { restaurantData } = useRestaurant();

  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
  const [openViewProfileDialog, setOpenViewProfileDialog] = useState(false);
  const [openDeleteStaffDialog, setOpenDeleteStaffDialog] = useState(false);
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
    data: staffData,
    isLoading: isLoadingStaff,
    error: staffError,
  } = useGetStaffMembers({
    restaurantId: restaurantData.restaurant.id,
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
    sortBy: sortModel,
    filters: filterModel,
  });

  const columns: GridColDef[] = [
    {
      field: "first_name",
      headerName: "First name",
      flex: 1,
    },
    {
      field: "last_name",
      headerName: "Last name",
      flex: 1,
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
          <Tooltip title="View profile">
            <IconButton
              aria-label="View profile"
              size="small"
              onClick={() => {
                setSelectedStaffId(row.id);
                setOpenViewProfileDialog(true);
              }}
            >
              <PeopleIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Terminate collaboration">
            <IconButton
              aria-label="terminate collaboration"
              size="small"
              color="error"
              onClick={() => {
                setSelectedStaffId(row.id);
                setOpenDeleteStaffDialog(true);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const rows: GridRowsProp =
    staffData?.staff.data.map((rider) => ({
      id: rider.id,
      first_name: rider.first_name,
      last_name: rider.last_name,
    })) || [];

  const staffMember = staffData?.staff.data.find(
    (s) => s.id === selectedStaffId,
  );

  if (staffError) {
    notifications.show(staffError.message, {
      key: "partner-staff-error",
      severity: "error",
    });
  }

  return (
    <>
      <DataGrid
        aria-label="Staff table"
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
        rowCount={staffData?.staff.total || 0}
        paginationModel={paginationModel}
        sortModel={sortModel}
        filterModel={filterModel}
        onPaginationModelChange={setPaginationModel}
        onSortModelChange={setSortModel}
        onFilterModelChange={setFilterModel}
        loading={isLoadingStaff}
        rows={rows}
        columns={columns}
        showToolbar
        ignoreDiacritics
        slotProps={{
          toolbar: {
            printOptions: { disableToolbarButton: true },
            csvOptions: { disableToolbarButton: true },
          },
        }}
      />

      <ViewProfileDialog
        staffMember={staffMember}
        openViewProfileDialog={openViewProfileDialog}
        setOpenViewProfileDialog={setOpenViewProfileDialog}
      />

      <DeleteStaffDialog
        staffMember={staffMember}
        openDeleteStaffDialog={openDeleteStaffDialog}
        setOpenDeleteStaffDialog={setOpenDeleteStaffDialog}
      />
    </>
  );
}

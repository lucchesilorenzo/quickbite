import { useCallback, useMemo, useState } from "react";

import {
  Autocomplete,
  AutocompleteValue,
  Box,
  Button,
  TextField,
  debounce,
} from "@mui/material";
import { useNotifications } from "@toolpad/core/useNotifications";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import EditLocationDialog from "@/components/common/LocationEditDialog";
import { useAddress } from "@/hooks/contexts/useAddress";
import env from "@/lib/env";
import { generateSlug } from "@/lib/utils";
import { Address } from "@/types";

export default function LocationSearch() {
  const { setCurrentAddress } = useAddress();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const notifications = useNotifications();
  const navigate = useNavigate();

  const fetchAddresses = useCallback(
    async (value: string) => {
      if (!value) {
        setAddresses([]);
        return;
      }

      try {
        const { data } = await axios.get<Address[]>(
          `https://api.locationiq.com/v1/autocomplete?key=${env.VITE_LOCATIONIQ_API_KEY}&q=${value}&limit=5&dedupe=1&countrycodes=IT&normalizecity=1`,
        );

        setAddresses(data);
      } catch {
        notifications.show("There was an error fetching addresses.", {
          key: "address-search-error",
          severity: "error",
        });
      }
    },
    [notifications],
  );

  const debouncedFetch = useMemo(
    () => debounce(fetchAddresses, 500),
    [fetchAddresses],
  );

  function handleAddressChange(
    _e: React.SyntheticEvent,
    value: AutocompleteValue<string, false, false, true>,
  ) {
    const selectedAddress = addresses.find((a) => a.display_name === value);

    if (selectedAddress) {
      setCurrentAddress(selectedAddress);

      if (!selectedAddress.address.house_number) {
        setOpenEditDialog(true);
        return;
      }

      navigate(`/area/${generateSlug(selectedAddress.display_name)}`);
    }
  }

  function handleGeolocation() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const { data } = await axios.get<Address>(
          `https://api.locationiq.com/v1/reverse?key=${env.VITE_LOCATIONIQ_API_KEY}&lat=${latitude}&lon=${longitude}&format=json&normalizecity=1`,
        );

        setCurrentAddress(data);

        if (!data.address.house_number) {
          setOpenEditDialog(true);
          return;
        }

        navigate(`/area/${generateSlug(data.display_name)}`);
      } catch {
        notifications.show("There was an error fetching your location.", {
          key: "geolocation-error",
          severity: "error",
        });
      }
    });
  }

  return (
    <Box>
      {openEditDialog && (
        <EditLocationDialog
          openDialog={openEditDialog}
          onCloseDialog={() => setOpenEditDialog(false)}
        />
      )}

      <Autocomplete
        id="address"
        freeSolo
        options={addresses.map((a) => a.display_name)}
        filterOptions={(x) => x}
        onChange={handleAddressChange}
        onInputChange={(_, value) => debouncedFetch(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Complete address"
            margin="normal"
            autoComplete="off"
          />
        )}
      />

      <Button variant="contained" onClick={handleGeolocation}>
        Current position
      </Button>
    </Box>
  );
}

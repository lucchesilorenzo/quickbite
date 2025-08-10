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

import LocationEditDialog from "@/components/common/LocationEditDialog";
import { useAddress } from "@/hooks/contexts/useAddress";
import env from "@/lib/env";
import { generateSlug } from "@/lib/utils";
import { Address } from "@/types";

type LocationSearchAreaProps = {
  openLocationSearchDialog: boolean;
  setOpenLocationSearchDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LocationSearchArea({
  openLocationSearchDialog,
  setOpenLocationSearchDialog,
}: LocationSearchAreaProps) {
  const { setCurrentAddress } = useAddress();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [openLocationEditDialog, setOpenLocationEditDialog] = useState(false);

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
          `https://api.locationiq.com/v1/autocomplete?key=${env.VITE_LOCATIONIQ_API_KEY}&q=${value}&limit=5&dedupe=1&normalizecity=1&countrycodes=IT`,
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
      navigate(
        `/area/${generateSlug(selectedAddress.display_name)}?lat=${selectedAddress.lat}&lon=${selectedAddress.lon}`,
      );

      if (!selectedAddress.address.house_number) {
        setOpenLocationEditDialog(true);
      }
    }
  }

  function handleGeolocation() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const { data } = await axios.get<Address>(
          `https://api.locationiq.com/v1/reverse?key=${env.VITE_LOCATIONIQ_API_KEY}&lat=${latitude}&lon=${longitude}&format=json&normalizecity=1&countrycodes=IT`,
        );

        setCurrentAddress(data);
        navigate(
          `/area/${generateSlug(data.display_name)}?lat=${data.lat}&lon=${data.lon}`,
        );

        if (!data.address.house_number) {
          setOpenLocationEditDialog(true);
          return;
        }
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
      {openLocationSearchDialog && (
        <LocationEditDialog
          openLocationEditDialog={openLocationEditDialog}
          onCloseDialogs={() => {
            setOpenLocationEditDialog(false);
            setOpenLocationSearchDialog(false);
          }}
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

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
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import LocationEditDialog from "@/components/common/LocationEditDialog";
import env from "@/lib/env";
import { Address, AddressEssentials } from "@/types";

type LocationSearchAreaProps = {
  openDialog: boolean;
  onCloseDialog: () => void;
};

export default function LocationSearchArea({
  openDialog,
  onCloseDialog,
}: LocationSearchAreaProps) {
  const [, setCookie] = useCookies(["address"]);
  const [address, setAddress] = useState("");
  const [addresses, setAddresses] = useState<AddressEssentials[]>([]);
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
        const query = value.toLowerCase();

        const { data } = await axios.get<Address[]>(
          `https://api.locationiq.com/v1/autocomplete?key=${env.VITE_LOCATIONIQ_API_KEY}&q=${query}&limit=5&dedupe=1&countrycodes=IT&normalizecity=1`,
        );

        const addresses = data.map((a: Address) => {
          const [houseNumber, road, ...rest] = a.display_name.split(",");

          return {
            addressString: `${road.trim()}, ${houseNumber.trim()}, ${rest.join(",").trim()}`,
            full: a,
          };
        });

        setAddresses(addresses);
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
    const selectedAddress = addresses.find((a) => a.addressString === value);

    if (selectedAddress) {
      const fullAddress = selectedAddress.full;

      setCookie("address", fullAddress);

      if (!fullAddress.address.postcode || !fullAddress.address.city) {
        navigate(`/area/${fullAddress.address.name}`);
        onCloseDialog();
        return;
      }

      if (!fullAddress.address.house_number) {
        setOpenEditDialog(true);
        return;
      }

      navigate(
        `/area/${fullAddress.address.postcode}-${fullAddress.address.city}`,
      );

      onCloseDialog();
    }
  }

  function handleGeolocation() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const { data } = await axios.get<Address>(
          `https://api.locationiq.com/v1/reverse?key=${env.VITE_LOCATIONIQ_API_KEY}&lat=${latitude}&lon=${longitude}&format=json&normalizecity=1`,
        );

        setCookie("address", data);

        if (!data.address.postcode) {
          navigate(`/area/${data.address.name}`);
          onCloseDialog();
          return;
        }

        if (!data.address.house_number) {
          setOpenEditDialog(true);
          return;
        }

        setAddress(data.display_name);
        navigate(`/area/${data.address.postcode}-${data.address.city}`);
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
      {openDialog && (
        <LocationEditDialog
          openDialog={openEditDialog}
          onCloseDialog={() => {
            setOpenEditDialog(false);
            onCloseDialog();
          }}
        />
      )}

      <Autocomplete
        id="address"
        freeSolo
        options={addresses.map((a) => a.addressString)}
        filterOptions={(x) => x}
        value={address}
        onChange={handleAddressChange}
        onInputChange={(_, value) => {
          setAddress(value);
          debouncedFetch(value);
        }}
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

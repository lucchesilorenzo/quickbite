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

import LocationDialog from "./LocationDialog";

import env from "@/lib/env";
import { Address, AddressEssentials } from "@/types";

export default function AddressSearchForm() {
  const [cookie, setCookie] = useCookies(["address"]);
  const [address, setAddress] = useState("");
  const [addresses, setAddresses] = useState<AddressEssentials[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

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
          `https://api.locationiq.com/v1/autocomplete?key=${env.VITE_LOCATIONIQ_API_KEY}&q=${query}&limit=5&dedupe=1&countrycodes=IT`,
        );

        const addresses = data.map((a: Address) => {
          const [houseNumber, road, ...rest] = a.display_name.split(",");

          return {
            addressString: `${road.trim()}, ${houseNumber.trim()}, ${rest.join(",").trim()}`,
            address: a.address,
          };
        });

        setAddresses(addresses);
        setCookie("address", JSON.stringify(data[0]));
      } catch {
        notifications.show("There was an error fetching addresses.", {
          key: "address-search-error",
          severity: "error",
        });
      }
    },
    [notifications, setCookie],
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
      const addr = selectedAddress.address;

      setCookie("address", JSON.stringify(addr));

      if (!addr.postcode) {
        navigate(`/area/${cookie.address.address.name}`);
      }

      if (!addr.house_number) {
        setOpenDialog(true);
        return;
      }

      navigate(
        `/area/${cookie.address.address.postcode}-${cookie.address.address.city}`,
      );
    }
  }

  function handleGeolocation() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const { data } = await axios.get<Address>(
          `https://api.locationiq.com/v1/reverse?key=${env.VITE_LOCATIONIQ_API_KEY}&lat=${latitude}&lon=${longitude}&format=json`,
        );

        setCookie("address", JSON.stringify(data));

        if (!data.address.postcode) {
          navigate(`/area/${data.address.name}`);
        }

        if (!data.address.house_number) {
          setOpenDialog(true);
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
        <LocationDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
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

import { useCallback, useMemo, useState } from "react";

import { Autocomplete, Box, Button, TextField, debounce } from "@mui/material";
import { useNotifications } from "@toolpad/core/useNotifications";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import env from "@/lib/env";
import { Address } from "@/types";

export default function AddressSearchForm() {
  const [address, setAddress] = useState("");
  const [addresses, setAddresses] = useState<string[]>([]);

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

        const { data } = await axios.get(
          `https://api.locationiq.com/v1/autocomplete?key=${env.VITE_LOCATIONIQ_API_KEY}&q=${query}&limit=5&dedupe=1&countrycodes=IT`,
        );

        const addresses: string[] = data.map((a: Address) => {
          const [houseNumber, road, ...rest] = a.display_name.split(",");

          return `${road.trim()}, ${houseNumber.trim()}, ${rest.join(",").trim()}`;
        });

        const filteredAddresses = [...new Set(addresses)];

        setAddresses(filteredAddresses);
        // setAddressSlug(`${data.address.postcode}-${data.address.city}`);
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

  function handleGeolocation() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const { data } = await axios.get(
          `https://api.locationiq.com/v1/reverse?key=${env.VITE_LOCATIONIQ_API_KEY}&lat=${latitude}&lon=${longitude}&format=json`,
        );

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
      <Autocomplete
        id="address"
        freeSolo
        options={addresses}
        filterOptions={(x) => x}
        value={address}
        onChange={(_, value) => {
          console.log(value);
        }}
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

import { useState } from "react";

import { Button, useMediaQuery } from "@mui/material";
import RestaurantCardMobile from "@public/area/restaurants/mobile/RestaurantCardMobile";
import { Icon, LatLngTuple } from "leaflet";
import {
  CircleMarker,
  LayerGroup,
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { useSearchParams } from "react-router-dom";

import RestaurantCard from "../../restaurants/RestaurantCard";
import ClickResetHandler from "./ClickResetHandler";
import ZoomGestureHandling from "./ZoomGestureHandling";

import { useAddress } from "@/contexts/AddressProvider";
import { useRestaurants } from "@/contexts/RestaurantsProvider";

export default function RestaurantMap() {
  const { restaurantsData } = useRestaurants();
  const { currentAddress } = useAddress();

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPosition, setSelectedPosition] = useState<LatLngTuple | null>(
    null,
  );

  const latitude = Number(currentAddress?.lat);
  const longitude = Number(currentAddress?.lon);

  const selectedRestaurant = restaurantsData.find(
    (r) =>
      selectedPosition?.includes(r.latitude) &&
      selectedPosition?.includes(r.longitude),
  );

  const restaurantMarkers = restaurantsData.map((r) => ({
    geocode: [r.latitude, r.longitude] as LatLngTuple,
    tooltip: `Marker on the map: ${r.name}.`,
  }));

  const customMarkerIcon = new Icon({
    iconUrl: "/location-pin.png",
    iconSize: [38, 38],
  });

  const customSelectedMarkerIcon = new Icon({
    iconUrl: "/restaurant-pin.png",
    iconSize: [45, 45],
  });

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  function handleMarkerClick(geocode: LatLngTuple) {
    const isSameMarker =
      selectedPosition?.[0] === geocode[0] &&
      selectedPosition?.[1] === geocode[1];

    if (isSameMarker) {
      setSelectedPosition(null);
    } else {
      setSelectedPosition(geocode);
    }
  }

  function handleReturnToList() {
    setSearchParams({
      lat: searchParams.getAll("lat"),
      lon: searchParams.getAll("lon"),
      filter: searchParams.getAll("filter"),
      mov: searchParams.getAll("mov"),
      sort_by: searchParams.getAll("sort_by"),
      view_type: [],
      q: searchParams.getAll("q"),
    });
  }

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      style={{ minHeight: isMobile ? "100vh" : "50vh", position: "relative" }}
      scrollWheelZoom={isMobile}
      zoomControl={!isMobile}
    >
      <Button
        sx={{
          position: "absolute",
          top: 10,
          right: { xs: 120, sm: 250, md: 360 },
          zIndex: 1000,
          bgcolor: "grey.900",
          "&:hover": { bgcolor: "grey.800" },
        }}
        variant="contained"
        size="small"
        onClick={handleReturnToList}
      >
        Return to list
      </Button>

      {selectedRestaurant && isMobile ? (
        <RestaurantCardMobile restaurant={selectedRestaurant} type="map" />
      ) : (
        selectedRestaurant && (
          <RestaurantCard restaurant={selectedRestaurant} type="map" />
        )
      )}

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ClickResetHandler onMapClick={() => setSelectedPosition(null)} />

      <ZoomGestureHandling />

      {/* Represents the location that was selected by the user */}
      <LayerGroup>
        <CircleMarker
          center={[latitude, longitude]}
          radius={25}
          stroke={false}
          pathOptions={{
            color: "blue",
            fillColor: "blue",
            fillOpacity: 0.3,
          }}
        />

        <CircleMarker
          center={[latitude, longitude]}
          radius={6}
          stroke={false}
          pathOptions={{
            color: "blue",
            fillColor: "blue",
            fillOpacity: 0.8,
          }}
        />
      </LayerGroup>

      <MarkerClusterGroup showCoverageOnHover={false} chunkedLoading>
        {restaurantMarkers.map((marker) => (
          <Marker
            key={marker.tooltip}
            position={marker.geocode}
            icon={
              selectedPosition?.[0] === marker.geocode[0] &&
              selectedPosition?.[1] === marker.geocode[1]
                ? customSelectedMarkerIcon
                : customMarkerIcon
            }
            eventHandlers={{
              click: () => handleMarkerClick(marker.geocode),
            }}
          >
            <Tooltip
              direction="bottom"
              offset={[100, 10]}
              className="leaflet-tooltip"
            >
              {marker.tooltip}
            </Tooltip>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

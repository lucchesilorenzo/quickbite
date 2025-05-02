import { useState } from "react";

import { Button } from "@mui/material";
import { Icon, LatLngTuple } from "leaflet";
import { useCookies } from "react-cookie";
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

import ClickResetHandler from "./ClickResetHandler";
import ZoomGestureHandling from "./ZoomGestureHandling";

import { useRestaurant } from "@/hooks/contexts/useRestaurant";

export default function RestaurantMap() {
  const { restaurants, setViewMap } = useRestaurant();

  const [searchParams, setSearchParams] = useSearchParams();
  const [cookies] = useCookies(["address"]);
  const [selectedPosition, setSelectedPosition] = useState<LatLngTuple | null>(
    null,
  );

  const latitude = Number(cookies?.address?.lat);
  const longitude = Number(cookies?.address?.lon);

  const restaurantMarkers = restaurants.map((r) => ({
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

  function handleMarkerClick(geocode: LatLngTuple) {
    const isSameMarker =
      selectedPosition &&
      selectedPosition[0] === geocode[0] &&
      selectedPosition[1] === geocode[1];

    if (isSameMarker) {
      setSelectedPosition(null);
    } else {
      setSelectedPosition(geocode);
    }
  }

  function handleReturnToList() {
    const currentFilters = searchParams.getAll("filter");
    const currentMOV = searchParams.getAll("mov");
    const currentSort = searchParams.getAll("sort_by");

    setSearchParams({
      filter: currentFilters,
      mov: currentMOV,
      sort_by: currentSort,
      view_type: [],
    });

    setViewMap(false);
  }

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      style={{ height: "50vh", position: "relative" }}
      scrollWheelZoom={false}
    >
      <Button
        sx={{
          position: "absolute",
          top: 10,
          right: 380,
          zIndex: 1000,
          bgcolor: "grey.900",
          "&:hover": {
            bgcolor: "grey.800",
          },
        }}
        variant="contained"
        size="small"
        onClick={handleReturnToList}
      >
        Return to list
      </Button>

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
              selectedPosition &&
              selectedPosition[0] === marker.geocode[0] &&
              selectedPosition[1] === marker.geocode[1]
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

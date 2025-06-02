import { Icon } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import RestaurantLocationInfo from "./RestaurantLocationInfo";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";

export default function RestaurantLocationDisplay() {
  const { restaurant } = useSingleRestaurant();

  const customShopIcon = new Icon({
    iconUrl: "/shop-pin.png",
    iconSize: [50, 50],
  });

  return (
    <MapContainer
      center={[restaurant.latitude, restaurant.longitude]}
      zoom={13}
      style={{ minHeight: "50vh", position: "relative" }}
      dragging={false}
      scrollWheelZoom={false}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker
        position={[restaurant.latitude, restaurant.longitude]}
        icon={customShopIcon}
      />

      <RestaurantLocationInfo restaurant={restaurant} />
    </MapContainer>
  );
}

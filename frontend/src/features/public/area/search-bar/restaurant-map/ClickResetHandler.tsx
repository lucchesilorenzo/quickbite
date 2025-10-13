import { useMapEvents } from "react-leaflet";

type ClickResetHandlerProps = {
  onMapClick: () => void;
};

export default function ClickResetHandler({
  onMapClick,
}: ClickResetHandlerProps) {
  useMapEvents({
    click: onMapClick,
  });

  return null;
}

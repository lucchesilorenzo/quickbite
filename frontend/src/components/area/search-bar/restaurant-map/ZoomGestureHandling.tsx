import { useEffect } from "react";

import GestureHandling from "leaflet-gesture-handling";
import { useMap } from "react-leaflet";

export default function ZoomGestureHandling() {
  const map = useMap();

  useEffect(() => {
    map.addHandler("gestureHandling", GestureHandling);

    // @ts-expect-error typescript does not see additional handler here
    map.gestureHandling.enable();
  }, [map]);

  return null;
}

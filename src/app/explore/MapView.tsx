"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import { Sighting } from "@/types/sighting";

type MapViewProps = {
  data: Sighting[];
};

export default function MapView({ data }: MapViewProps) {
  return (
    <MapContainer
      center={[-2, 118]}
      zoom={5}
      style={{ height: "400px", width: "100%" }}
      className="rounded-xl overflow-hidden z-0"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {data.map((item) => (
        <Marker
          key={item.id}
          position={[item.latitude, item.longitude]}
        >
          <Popup>{item.nama_lokal}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
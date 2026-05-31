"use client";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
} from "react-leaflet";

export default function MapView({ data }: any) {
    return (
    <MapContainer
        center={[-2, 118]}
        zoom={5}
        style={{ height: "400px" }}
    >
        <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {data.map((item: any) => (
        <Marker
            key={item.id}
            position={[item.latitude, item.longitude]}
        >
            <Popup>
            {item.nama_lokal}
            </Popup>
        </Marker>
        ))}
    </MapContainer>
    );
}
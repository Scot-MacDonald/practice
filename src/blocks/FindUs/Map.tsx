"use client";

import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

type Props = {
  lat: number;
  lng: number;
  secondIconUrl?: string;
  thirdIconUrl?: string;
};

export default function Map({ lat, lng, secondIconUrl, thirdIconUrl }: Props) {
  const [Map, setMap] = useState<React.ReactNode>(null);

  useEffect(() => {
    const loadMap = async () => {
      const { MapContainer, TileLayer, Marker } = await import("react-leaflet");
      const L = await import("leaflet");
      //   await import("leaflet/dist/leaflet.css");

      const dotIcon = L.divIcon({
        className: "custom-marker",
        html: '<div class="dot"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      const imageIcon = L.icon({
        iconUrl: secondIconUrl || "/media/S-Bahn-Logo.svg.webp",
        iconSize: [20, 20],
        iconAnchor: [15, 15],
        className: "image-marker",
      });

      const imageIconU = L.icon({
        iconUrl: thirdIconUrl || "/media/U-Bahn.svg",
        iconSize: [20, 20],
        iconAnchor: [15, 15],
        className: "image-marker",
      });

      setMap(
        <MapContainer
          center={[lat, lng]}
          zoom={16}
          zoomControl={true}
          scrollWheelZoom={false}
          dragging={true}
          doubleClickZoom={false}
          style={{
            height: "550px",
            width: "100%",
            borderRadius: "12px",
            zIndex: 1,
          }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution="&copy; <a href='https://carto.com/'>CARTO</a>"
          />
          <Marker position={[lat, lng]} icon={dotIcon} />
          {/* <Marker
            position={[52.52497770786654, 13.392909433053319]}
            icon={imageIcon}
          />
          <Marker
            position={[52.52552931610739, 13.387399706552674]}
            icon={imageIconU}
          /> */}
        </MapContainer>
      );
    };

    loadMap();
  }, [lat, lng, secondIconUrl, thirdIconUrl]);

  return <div>{Map || <div>Loading map…</div>}</div>;
}

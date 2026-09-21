"use client";

import { useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const destinations = [
  {
    name: "Swiss Alps",
    country: "Switzerland",
    position: [46.8182, 8.2275] as [number, number],
    description:
      "Snow-covered peaks, quiet valleys and landscapes that feel almost unreal.",
  },
  {
    name: "Santorini",
    country: "Greece",
    position: [36.3932, 25.4615] as [number, number],
    description:
      "Whitewashed villages, blue horizons and sunsets that paint the Aegean sky.",
  },
  {
    name: "Bali",
    country: "Indonesia",
    position: [-8.4095, 115.1889] as [number, number],
    description:
      "Tropical forests, ancient temples and slow island mornings surrounded by ocean.",
  },
  {
    name: "Kyoto",
    country: "Japan",
    position: [35.0116, 135.7681] as [number, number],
    description:
      "Ancient streets, quiet temples and a culture shaped by centuries of tradition.",
  },
  {
    name: "Patagonia",
    country: "Argentina",
    position: [-41.8101, -68.9063] as [number, number],
    description:
      "Wild mountains, endless horizons and some of the planet's most dramatic landscapes.",
  },
];

const route = destinations.map((destination) => destination.position);

const createMarkerIcon = (selected: boolean) =>
  L.divIcon({
    className: "journey-map-marker-wrapper",
    html: `
      <div class="journey-map-marker ${selected ? "selected" : ""}">
        <span class="journey-map-marker-pulse"></span>
        <span class="journey-map-marker-dot"></span>
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });

function MapController({
  selectedDestination,
}: {
  selectedDestination: (typeof destinations)[number] | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!selectedDestination) return;

    map.flyTo(selectedDestination.position, 4, {
      duration: 1.2,
    });
  }, [map, selectedDestination]);

  return null;
}

type LeafletMapProps = {
  selectedDestination: (typeof destinations)[number] | null;
  onSelect: (destination: (typeof destinations)[number]) => void;
};

export default function LeafletMap({
  selectedDestination,
  onSelect,
}: LeafletMapProps) {
  return (
    <MapContainer
      center={[20, 20]}
      zoom={2}
      minZoom={2}
      maxZoom={6}
      scrollWheelZoom={true}
      className="journey-leaflet-map h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapController selectedDestination={selectedDestination} />

      <Polyline
        positions={route}
        pathOptions={{
          color: "#ff8a3d",
          weight: 2,
          opacity: 0.75,
          dashArray: "8 12",
          className: "journey-route",
        }}
      />

      {destinations.map((destination) => {
        const isSelected =
          selectedDestination?.name === destination.name;

        return (
          <Marker
            key={destination.name}
            position={destination.position}
            icon={createMarkerIcon(isSelected)}
            eventHandlers={{
              click: () => onSelect(destination),
            }}
          >
            <Popup>
              <div className="min-w-[150px]">
                <strong>{destination.name}</strong>
                <br />
                <span>{destination.country}</span>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export { destinations };
"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function CityMap({ city }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // inline SVG pin -> data URL (no external assets)
  const getSvgDataUrl = (fill = "#d00") => {
    const svg = `
      <svg xmlns='http://www.w3.org/2000/svg' width='32' height='48' viewBox='0 0 32 48'>
        <path d='M16 0C9.373 0 4 5.373 4 12c0 9.333 12 24 12 24s12-14.667 12-24c0-6.627-5.373-12-12-12z' fill='${fill}'/>
        <circle cx='16' cy='12' r='5.2' fill='#fff'/>
      </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  };

  useEffect(() => {
    // Initialize map once
    if (!mapRef.current) {
      const map = L.map("city-map", {
        zoomControl: true,
        attributionControl: true,
      });
      mapRef.current = map;

      // Fit Germany bounds so map always shows Germany
      const bounds = L.latLngBounds([47.2701, 5.8663], [55.0581, 15.0419]);
      map.fitBounds(bounds);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 18,
      }).addTo(map);
    }

    // If no city selected, clear marker and return
    if (!city) {
      if (markerRef.current) {
        mapRef.current.removeLayer(markerRef.current);
        markerRef.current = null;
      }
      return;
    }

    // Helper: geocode city (Nominatim restricted to Germany)
    async function getCityCoordinates(cityName) {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&countrycodes=de&q=${encodeURIComponent(
          cityName
        )}`
      );
      const data = await res.json();
      if (!data || data.length === 0) throw new Error("City not found");
      return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
    }

    async function addMarker() {
      try {
        const { lat, lon } = await getCityCoordinates(city);

        // remove old marker if exists
        if (markerRef.current) {
          mapRef.current.removeLayer(markerRef.current);
          markerRef.current = null;
        }

        const svgUrl = getSvgDataUrl("#d00"); // red pin
        const svgIcon = L.icon({
          iconUrl: svgUrl,
          iconSize: [32, 48],
          iconAnchor: [16, 48],
          popupAnchor: [0, -46],
        });

        // create marker without popup
        const m = L.marker([lat, lon], {
          icon: svgIcon,
          interactive: true,
        }).addTo(mapRef.current);

        markerRef.current = m;
      } catch (err) {
        console.error("Geocode/marker error:", err);
      }
    }

    addMarker();

    return () => {};
  }, [city]);

  return <div id="city-map" className="w-full h-full" />;
}

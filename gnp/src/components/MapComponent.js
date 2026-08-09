"use client";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function CityMap({ city }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // inline SVG pin -> data URL (no external assets)
  const getSvgDataUrl = (fill = "#d00") => {
    const svg = `
      <svg xmlns='http://www.w3.org/2000/svg' width='32' height='48' viewBox='0 0 32 48'>
        <path d='M16 0C9.373 0 4 5.373 4 12c0 9.333 12 24 12 24s12-14.667 12-24c0-6.627-5.373-12-12-12z' fill='${fill}'/>
        <circle cx='16' cy='12' r='5.2' fill='#fff'/>
      </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  };

  // Initialize map once
  useEffect(() => {
    if (mapRef.current) return;

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

    // Fix for maps rendering before their container has final layout
    // dimensions (common on mobile / inside flex/grid containers).
    const invalidate = () => map.invalidateSize();
    setTimeout(invalidate, 0);
    setTimeout(invalidate, 250);

    let resizeObserver;
    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      resizeObserver = new ResizeObserver(() => invalidate());
      resizeObserver.observe(containerRef.current);
    }
    window.addEventListener("resize", invalidate);

    return () => {
      window.removeEventListener("resize", invalidate);
      resizeObserver?.disconnect();
    };
  }, []);

  // Update marker whenever city changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    setNotFound(false);

    if (!city) {
      if (markerRef.current) {
        map.removeLayer(markerRef.current);
        markerRef.current = null;
      }
      return;
    }

    let cancelled = false;

    async function getCityCoordinates(cityName) {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&countrycodes=de&q=${encodeURIComponent(
          cityName
        )}`
      );
      if (!res.ok) throw new Error("Geocoding request failed");
      const data = await res.json();
      if (!data || data.length === 0) throw new Error("City not found");
      return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
    }

    async function addMarker() {
      setLoading(true);
      try {
        const { lat, lon } = await getCityCoordinates(city);
        if (cancelled) return;

        if (markerRef.current) {
          map.removeLayer(markerRef.current);
          markerRef.current = null;
        }

        const svgIcon = L.icon({
          iconUrl: getSvgDataUrl("#d00"),
          iconSize: [32, 48],
          iconAnchor: [16, 48],
          popupAnchor: [0, -46],
        });

        const m = L.marker([lat, lon], {
          icon: svgIcon,
          interactive: true,
        }).addTo(map);

        markerRef.current = m;
        map.flyTo([lat, lon], 11, { duration: 0.8 });
      } catch (err) {
        if (!cancelled) {
          console.error("Geocode/marker error:", err);
          setNotFound(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    addMarker();

    return () => {
      cancelled = true;
    };
  }, [city]);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <div id="city-map" className="w-full h-full" />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 text-sm text-gray-600 pointer-events-none">
          Locating on map…
        </div>
      )}
      {notFound && !loading && (
        <div className="absolute bottom-2 left-2 right-2 text-center text-xs bg-red-500/90 text-white rounded-md py-1 px-2">
          Couldn&apos;t pin this location on the map
        </div>
      )}
    </div>
  );
}

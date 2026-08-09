"use client";
import dynamic from "next/dynamic";
import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Data from "../../public/city-initials.json";
const CityMap = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
      Loading map…
    </div>
  ),
});

import BadenWurttemberg from "../../public/flags/Baden-Wurtem.png";
import Bayern from "../../public/flags/Bayern.png";
import Berlin from "../../public/flags/Berlin.png";
import Brandenburg from "../../public/flags/Brandenburg.png";
import Bremen from "../../public/flags/Bremen.png";
import Hamburg from "../../public/flags/Hamburg.png";
import Hessen from "../../public/flags/Hessen.png";
import MecklenburgVorpommern from "../../public/flags/Mecklenburg-Vorpommern.png";
import Niedersachsen from "../../public/flags/Niedersachsen.png";
import NordrheinWestfalen from "../../public/flags/Nordrhein-Westfalen.png";
import RheinlandPfalz from "../../public/flags/Rheinland-Pfalz.png";
import Saarland from "../../public/flags/Saarland.png";
import Sachsen from "../../public/flags/Sachsen.png";
import SachsenAnhalt from "../../public/flags/Sachsen-Anhalt.png";
import SchleswigHolstein from "../../public/flags/Schleswig-Holstein.png";
import Thüringen from "../../public/flags/Thüringen.png";

const stateMapImages = {
  "Baden-Württemberg": BadenWurttemberg,
  Bayern: Bayern,
  Berlin: Berlin,
  Brandenburg: Brandenburg,
  Bremen: Bremen,
  Hamburg: Hamburg,
  Hessen: Hessen,
  "Mecklenburg-Vorpommern": MecklenburgVorpommern,
  Niedersachsen: Niedersachsen,
  "Nordrhein-Westfalen": NordrheinWestfalen,
  "Rheinland-Pfalz": RheinlandPfalz,
  Saarland: Saarland,
  Sachsen: Sachsen,
  "Sachsen-Anhalt": SachsenAnhalt,
  "Schleswig-Holstein": SchleswigHolstein,
  Thüringen: Thüringen,
};

// The source data mixes German and English state names for the same
// state (e.g. "Hesse" vs "Hessen"). Normalize so every entry resolves
// to the correct flag image instead of silently showing no flag.
const stateNameAliases = {
  Hesse: "Hessen",
  "Rhineland-Palatinate": "Rheinland-Pfalz",
  Saxony: "Sachsen",
  "Saxony-Anhalt": "Sachsen-Anhalt",
  Thuringia: "Thüringen",
};

const normalizeState = (state) => stateNameAliases[state] || state;

const QUICK_SEARCHES = ["B", "M", "K", "F", "HH", "S", "D", "L"];

const STATE_COUNT = new Set(
  Data.map((item) => normalizeState(item.state)).filter((s) => s !== "N/A" && s !== "Germany")
).size;

const MAX_SUGGESTIONS = 6;

export default function CenterBox() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const suggestions = useMemo(() => {
    const q = query.trim().toUpperCase();
    if (!q) return [];
    return Data.filter((item) => item.initials.toUpperCase().startsWith(q))
      .sort((a, b) => a.initials.length - b.initials.length)
      .slice(0, MAX_SUGGESTIONS);
  }, [query]);

  const runSearch = (raw) => {
    const value = (raw ?? query).trim();
    if (!value) return;

    const match = Data.find(
      (item) => item.initials.toUpperCase() === value.toUpperCase()
    );

    setShowSuggestions(false);

    if (match) {
      setResult(match);
      setError("");
      setQuery(match.initials);
    } else {
      setResult(null);
      setError(`No match found for "${value.toUpperCase()}". Try just the first 1–3 letters.`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      runSearch();
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const handleSelectSuggestion = (item) => {
    setQuery(item.initials);
    runSearch(item.initials);
  };

  const clearSearch = () => {
    setQuery("");
    setResult(null);
    setError("");
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const normalizedState = result ? normalizeState(result.state) : null;
  const flagImage = result ? stateMapImages[normalizedState] : null;

  return (
    <div className="flex items-center justify-center w-full px-0 sm:px-4">
      <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 sm:p-8 shadow-xl flex flex-col items-center justify-start gap-5 w-full max-w-3xl transition-all duration-300 border border-white/30">
        {/* Search bar */}
        <div className="relative w-full">
          <div className="rounded-xl w-full text-black flex items-stretch shadow-sm">
            <input
              ref={inputRef}
              type="text"
              inputMode="text"
              autoCapitalize="characters"
              autoCorrect="off"
              spellCheck={false}
              placeholder="e.g. B, M, K..."
              className="flex-1 min-w-0 px-4 py-3 text-base bg-white border border-gray-300 border-r-0 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
                if (error) setError("");
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 120)}
              onKeyDown={handleKeyDown}
            />
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Clear search"
                className="px-3 bg-white border-t border-b border-gray-300 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
            <button
              onClick={() => runSearch()}
              className="px-5 py-3 bg-blue-600 text-white font-medium rounded-r-xl border border-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors whitespace-nowrap"
            >
              Search
            </button>
          </div>

          {/* Suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden text-left">
              {suggestions.map((item) => (
                <li key={item.initials}>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelectSuggestion(item)}
                    className="w-full px-4 py-2.5 flex items-center justify-between gap-3 hover:bg-blue-50 text-sm"
                  >
                    <span className="font-semibold text-blue-700">
                      {item.initials}
                    </span>
                    <span className="text-gray-600 truncate">
                      {item.city}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Quick searches */}
        {!result && !error && (
          <div className="flex flex-wrap items-center justify-center gap-2 -mt-1">
            <span className="text-xs text-gray-600/80 mr-1">Try:</span>
            {QUICK_SEARCHES.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => {
                  setQuery(code);
                  runSearch(code);
                }}
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/70 text-blue-800 hover:bg-white transition-colors"
              >
                {code}
              </button>
            ))}
          </div>
        )}

        {/* Inline error */}
        {error && (
          <p className="w-full text-center text-sm text-red-100 bg-red-500/80 rounded-lg py-2 px-3">
            {error}
          </p>
        )}

        {/* Empty state */}
        {!result && !error && (
          <div className="w-full rounded-xl border-2 border-dashed border-white/40 py-10 px-6 flex flex-col items-center gap-2 text-center">
            <span className="text-4xl">🚗</span>
            <p className="text-white font-medium">
              Search a code to see it here
            </p>
            <p className="text-blue-100/80 text-sm max-w-xs">
              We cover {STATE_COUNT} German states and {Data.length} district &amp; city
              codes — from big cities to tiny rural counties.
            </p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="bg-white rounded-xl w-full p-4 sm:p-6 shadow-md flex flex-col md:flex-row gap-4 sm:gap-6 animate-[fadeIn_0.25s_ease-out]">
            {/* Info + flag box */}
            <div className="bg-gray-100 rounded-xl w-full md:w-1/2 p-4 flex flex-col gap-3 text-center">
              <p className="text-gray-800 text-xl font-bold">{result.city}</p>
              <p className="text-gray-500 text-sm uppercase tracking-wide">
                {normalizedState === "N/A" ? "Special registration" : normalizedState}
              </p>

              <div className="mt-2 h-56 sm:h-72 md:h-80 w-full rounded-lg overflow-hidden bg-gray-200 relative">
                {flagImage ? (
                  <Image
                    src={flagImage}
                    alt={`${result.state} map`}
                    fill
                    sizes="(max-width: 768px) 90vw, 400px"
                    className="object-contain"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm px-4 text-center">
                    No state map available for this code
                  </div>
                )}
              </div>
            </div>

            {/* Map container */}
            <div className="w-full md:w-1/2 h-56 sm:h-72 md:h-80 rounded-xl overflow-hidden bg-gray-200">
              <CityMap city={result.state === "N/A" ? null : result.city} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

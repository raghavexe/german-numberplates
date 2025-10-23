"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import Data from "../../public/city-initials.json";

export default function CenterBox() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const handleSearch = () => {
    const match = Data.find(
      (item) => item.initials.toUpperCase() === query.toUpperCase()
    );

    if (match) {
      setResult(match);
    } else {
      setResult(null);
      alert("No match found!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 mt-8">
      <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-lg flex flex-col items-center justify-start gap-6 w-[80vw] max-w-5xl h-auto transition-all duration-300">
        {/* Search bar */}
        <div className="rounded-xl w-full text-black flex items-center justify-center p-4">
          <input
            type="text"
            placeholder="Enter number plate initials..."
            className="flex-1 px-4 py-3 border border-gray-300 border-r-0 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="px-4 py-3 bg-blue-500 text-white rounded-r-lg border border-gray-300 border-l-0 hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {/* Full-width result box */}
        {result && (
          <div className="bg-white rounded-xl w-full  p-6 shadow-md flex flex-row gap-6">
            {/* Inner amber box */}
            <div className="bg-amber-300 rounded-xl w-1/2  h-96 p-4   flex flex-col gap-3 text-left">
              <p className="text-gray-800 text-lg font-semibold">
                {result.city}
              </p>
              <p className="text-gray-700">{result.state}</p>

              <div className="mt-4 h-full w-full flex items-center justify-center rounded-lg mb-3 bg-gray-200">
                <span className="text-xl">🏴</span>
              </div>
            </div>

            {/* Map container */}
            <div className="w-1/2 **h-96** rounded-xl overflow-hidden bg-red-500"></div>
          </div>
        )}
      </div>
    </div>
  );
}

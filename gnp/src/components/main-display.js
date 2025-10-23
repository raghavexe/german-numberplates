"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import Image from "next/image";
import Data from "../../public/city-initials.json";
const CityMap = dynamic(() => import("./MapComponent"), { ssr: false });

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

export default function CenterBox() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [flag, setFlag] = useState("");

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
    <div className="flex items-center justify-center mt-5 p-6">
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
            <div className="bg-gray-200 rounded-xl w-1/2  h-96 p-4   flex flex-col gap-3 text-center">
              <p className="text-gray-800 text-lg font-semibold">
                {result.city}
              </p>
              <p className="text-gray-700">{result.state}</p>

              <div className="mt-4 h-full w-full rounded-lg overflow-hidden bg-gray-200 relative">
                <Image
                  src={stateMapImages[result.state]}
                  alt={`${result.state} map`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Map container */}
            <div className="w-1/2 **h-96** rounded-xl overflow-hidden bg-grey-200">
              <CityMap city={result.city} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

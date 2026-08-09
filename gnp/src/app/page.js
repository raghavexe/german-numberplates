import Header from "@/components/header";
import CenterBox from "@/components/main-display";
import Data from "../../public/city-initials.json";

const features = [
  {
    icon: "🔤",
    title: "Enter the code",
    text: "Type the first letters from any German license plate.",
  },
  {
    icon: "📍",
    title: "Find the origin",
    text: "Instantly discover which city and state it belongs to.",
  },
  {
    icon: "🗺️",
    title: "See it on the map",
    text: "The exact location is pinned live on an interactive map.",
  },
];

export default function Home() {
  const codeCount = Data.length;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-800 via-blue-700 to-blue-600 font-sans overflow-hidden">
      {/* Decorative background shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-sky-300/10 rounded-full blur-3xl" />
      </div>

      <div className="relative flex flex-col items-center px-4 sm:px-6 pt-24 sm:pt-28 pb-12">
        <Header />

        {/* Intro */}
        <div className="text-center max-w-2xl mb-8 sm:mb-10">
          <span className="inline-block text-xs font-semibold tracking-wide uppercase text-blue-100 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-4">
            🇩🇪 {codeCount} registration codes
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            German Number Plate Finder
          </h1>
          <p className="mt-4 text-blue-100 text-sm sm:text-lg">
            Look up any German vehicle registration code and see exactly where
            it comes from — city, state, and map, all in one search.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 w-full max-w-3xl gap-4 mb-8">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="border border-white/30 bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center text-white flex flex-col items-center gap-2 transition-transform hover:-translate-y-1 hover:bg-white/10"
            >
              <span className="text-2xl">{f.icon}</span>
              <p className="font-semibold text-sm">
                <span className="text-blue-200 mr-1">{i + 1}.</span>
                {f.title}
              </p>
              <p className="text-xs text-blue-100">{f.text}</p>
            </div>
          ))}
        </div>

        <CenterBox />

        {/* Fun fact strip */}
        <div className="mt-10 w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          {[
            { label: "Codes", value: codeCount },
            { label: "States covered", value: 16 },
            { label: "Letters, max", value: 3 },
            { label: "Countries", value: 1 },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 border border-white/20 rounded-lg py-3"
            >
              <p className="text-xl sm:text-2xl font-bold text-white">
                {stat.value}
              </p>
              <p className="text-[11px] sm:text-xs text-blue-100 uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <footer className="mt-10 text-center text-blue-200/70 text-xs">
          Data covers current German district &amp; city registration codes.
        </footer>
      </div>
    </div>
  );
}

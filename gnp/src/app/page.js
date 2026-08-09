import Header from "@/components/header";
import CenterBox from "@/components/main-display";

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
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 via-blue-700 to-blue-600 font-sans flex flex-col items-center px-4 sm:px-6 pt-24 sm:pt-28 pb-12">
      <Header />

      {/* Intro */}
      <div className="text-center max-w-2xl mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
          German Number Plate Finder
        </h1>
        <p className="mt-3 text-blue-100 text-sm sm:text-base">
          Look up any German vehicle registration code and see exactly where
          it comes from.
        </p>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 w-full max-w-3xl gap-4 mb-6">
        {features.map((f) => (
          <div
            key={f.title}
            className="border border-white/30 bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center text-white flex flex-col items-center gap-2 transition-transform hover:-translate-y-1 hover:bg-white/10"
          >
            <span className="text-2xl">{f.icon}</span>
            <p className="font-semibold text-sm">{f.title}</p>
            <p className="text-xs text-blue-100">{f.text}</p>
          </div>
        ))}
      </div>

      <CenterBox />

      <footer className="mt-10 text-center text-blue-200/70 text-xs">
        Data covers current German district &amp; city registration codes.
      </footer>
    </div>
  );
}

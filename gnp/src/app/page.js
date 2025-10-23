import Header from "@/components/header";
import CenterBox from "@/components/main-display";

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-700 font-sans flex flex-col items-center p-6 mt-5">
      {/* Header at the top */}
      <Header />
      <div className="flex flex-col md:flex-row justify-center mt-30 gap-6 mb-4">
        <div className="border-2 border-dotted border-white rounded-xl p-4 w-64 text-center text-white">
          Enter the first letters from the license plate
        </div>
        <div className="border-2 border-dotted border-white rounded-xl p-4 w-64 text-center text-white">
          Discover which city and state it belongs to
        </div>
        <div className="border-2 border-dotted border-white rounded-xl p-4 w-64 text-center text-white">
          See the location on the map
        </div>
      </div>

      {/* CenterBox */}
      <CenterBox />
    </div>
  );
}

import Image from "next/image";
import Logo from "../../public/Logo.svg";
export default function Header() {
  return (
    <header className="h-20 flex justify-start items-center fixed top-0 left-0 right-0 z-50 px-1 bg-black">
      <Image
        src={Logo}
        alt="Website logo depicting a numberplate"
        className="h-10 w-auto px-1"
      />

      {/* About button at top-right */}
      <span className="absolute right-4 text-white font-semibold text-lg top-1/3 hover:text-blue-600 cursor-pointer">
        About
      </span>
    </header>
  );
}

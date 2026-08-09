import Image from "next/image";
import Logo from "../../public/Logo.svg";

export default function Header() {
  return (
    <header className="h-16 sm:h-20 flex justify-center items-center fixed top-0 left-0 right-0 z-50 px-4 bg-black/90 backdrop-blur-md shadow-lg shadow-black/20">
      <Image
        src={Logo}
        alt="Website logo depicting a numberplate"
        className="h-10 sm:h-14 w-auto"
        priority
      />
    </header>
  );
}

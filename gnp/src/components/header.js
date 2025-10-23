import Image from "next/image";
import Logo from "../../public/Logo.svg";
export default function Header() {
  return (
    <header className="h-20 flex justify-center items-center fixed top-0 left-0 right-0 z-50 px-1 bg-black">
      <Image
        src={Logo}
        alt="Website logo depicting a numberplate"
        className="h-15 w-auto px-1"
      />
    </header>
  );
}

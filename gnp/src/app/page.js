import Image from "next/image";
import Header from "@/components/header";
import CenterBox from "@/components/main-display";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-500 font-sans ">
      <Header></Header>
      <CenterBox></CenterBox>
    </div>
  );
}

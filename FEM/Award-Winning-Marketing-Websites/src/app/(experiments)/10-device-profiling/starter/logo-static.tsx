import Image from "next/image";
import Logo from "@/../public/logo-color.png";

export function StaticVersion() {
  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <Image src={Logo} alt="Frontend masters logo" className="max-w-full" />
    </div>
  );
}

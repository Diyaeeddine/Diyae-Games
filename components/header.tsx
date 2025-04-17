import Image from "next/image";
import "../styles/globals.css";
export default function Header() {
  return (
    <>
      <div className="relative mb-3 pb-5">
        <Image
          src="/assets/images/logo.jpg"
          alt="Logo"
          width={200}
          height={100}
          layout="intrinsic"
          className=""
        />

        <div className="absolute bottom-0 w-[200px] h-1 animate-border-oklch rounded-sm" />
      </div>
    </>
  );
}

import Image from "next/image";
export default function Header() {
  return (
    <div>
      <Image
        src="/assets/images/logo.jpg"
        alt="Logo"
        width={200}
        height={100}
        className="mb-3"
      />
    </div>
  );
}

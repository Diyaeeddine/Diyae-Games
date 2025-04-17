import Image from "next/image";

export default function Header() {
  return (
    <div
      className="mb-3  flex justify-center"
      style={{
        borderBottom: "4px solid transparent",
        borderImage: "linear-gradient(to right, #FBBF24, #FFFFFF) 1",
        paddingBottom: "20px", // Adjust padding to control the space between the image and the border
      }}
    >
      <Image
        src="/assets/images/logo.jpg"
        alt="Logo"
        width={170}
        height={85}
        layout="intrinsic"
        className=""
      />
    </div>
  );
}

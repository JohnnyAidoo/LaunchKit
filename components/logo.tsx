import Image from "next/image";

function Logo() {
  return (
    <>
      <Image src="/icon.png" alt="Logo" width={50} height={50} />
    </>
  );
}

export default Logo;

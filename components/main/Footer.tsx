import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="w-full mt-auto">
      <Image
        src="/footer.png"
        alt="Footer"
        width={1440}
        height={40}
        className="mx-auto"
        priority
      />
    </footer>
  );
};

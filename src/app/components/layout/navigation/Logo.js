import Link from "next/link";
import Image from "next/image";

const Logo = () => (
  <Link href="/" className="flex-shrink-0">
    <Image
      src="/assets/logo.svg"
      alt="Fatafat Logo"
      width={120}
      height={40}
      className="h-8 sm:h-10 w-auto transform hover:scale-105 transition-transform"
    />
  </Link>
);

export default Logo;

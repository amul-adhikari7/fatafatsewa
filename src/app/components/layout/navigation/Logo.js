import Link from "next/link";
import Image from "next/image";

const Logo = () => (
  <Link href="/" className="block flex-shrink-0 w-[120px] h-[32px] sm:h-[40px]">
    <Image
      src="/assets/logo.svg"
      alt="Fatafat Logo"
      width={120}
      height={40}
      priority
      className="w-full h-full transition-transform transform hover:scale-105"
    />
  </Link>
);

export default Logo;

import Image from 'next/image';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <Image
      src="/pico-foods-logo.webp"
      alt="Pico Foods"
      width={1774}
      height={887}
      className={`h-auto object-contain ${className}`} />);

}

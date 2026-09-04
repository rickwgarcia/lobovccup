import logoMark from '@/assets/icons/logo-mark.svg';

interface LogoProps {
  className?: string;
  markClassName?: string;
  textClassName?: string;
}

export default function Logo({ className = '', markClassName = '', textClassName = '' }: LogoProps) {
  return (
    <a href="#top" className={`inline-flex items-center gap-3 ${className}`}>
      <img src={logoMark} alt="" className={`h-[34px] w-[48px] ${markClassName}`} />
      <span className={`font-grotesk text-lg font-bold leading-none text-black sm:text-xl ${textClassName}`}>
        Lobo VC Cup
      </span>
    </a>
  );
}

import sponsorLogo1 from '@/assets/images/sponsor-logo-1.svg';
import sponsorLogo2 from '@/assets/images/sponsor-logo-2.svg';

export default function LogoStrip() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-10 bg-brand-silver px-6 py-8 sm:gap-14 lg:gap-24 lg:px-16 lg:py-0 lg:h-[110px]">
      <img src={sponsorLogo1} alt="UNM partner logo" className="h-auto w-[150px] sm:w-[180px] lg:w-[220px]" />
      <img src={sponsorLogo2} alt="UNM Anderson School of Management logo" className="h-auto w-[190px] sm:w-[230px] lg:w-[280px]" />
    </div>
  );
}

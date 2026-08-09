import sponsorLogo1 from '@/assets/images/sponsor-logo-1.svg';
import sponsorLogo2 from '@/assets/images/sponsor-logo-2.svg';

export default function LogoStrip() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-12 bg-brand-silver px-6 py-10 sm:gap-16 lg:gap-[206px] lg:px-[100px] lg:py-0 lg:h-[145px]">
      <img src={sponsorLogo1} alt="UNM partner logo" className="h-auto w-[180px] sm:w-[220px] lg:w-[273px]" />
      <img src={sponsorLogo2} alt="UNM Anderson School of Management logo" className="h-auto w-[230px] sm:w-[280px] lg:w-[349px]" />
    </div>
  );
}

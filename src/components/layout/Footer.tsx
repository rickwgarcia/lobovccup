import Container from '@/components/common/Container';
import Logo from '@/components/common/Logo';
import SectionLabel from '@/components/common/SectionLabel';
import { navLinks } from '@/data/nav';
import socialIcon from '@/assets/icons/social-icon.svg';

export default function Footer() {
  return (
    <footer className="w-full rounded-t-card bg-brand-gray">
      <Container className="flex flex-col gap-12 py-12 sm:gap-16 lg:py-[55px]">
        <div className="flex flex-col gap-10 lg:gap-[66px]">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <Logo />
            <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-grotesk text-base leading-normal text-black underline decoration-solid underline-offset-2"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <a href="#" aria-label="Lobo VC Cup on social media">
              <img src={socialIcon} alt="" className="size-[30px]" />
            </a>
          </div>

          <div className="flex flex-col gap-10 lg:flex-row lg:gap-[154px]">
            <div className="flex flex-col gap-6 lg:gap-[27px]">
              <SectionLabel as="h4" size="h4">
                Contact us:
              </SectionLabel>
              <div className="flex flex-col gap-4 font-grotesk text-body text-black sm:gap-5">
                <p>lobovccup@unmm.onmicrosoft.com</p>
                <p>University of New Mexico</p>
                <p>
                  1155 University Blvd SE
                  <br />
                  Albuquerque, NM 87106
                </p>
              </div>
            </div>

            <div className="flex w-full items-center justify-center rounded-btn bg-ink/90 px-6 py-8 sm:px-10 sm:py-[58px] lg:w-[646px]">
              <a
                href="#join"
                className="flex w-full max-w-[554px] items-center justify-center rounded-btn bg-turquoise px-8 py-5 text-center font-grotesk text-lg leading-7 text-black hover:opacity-90"
              >
                Join Email List
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10 lg:gap-[50px]">
          <div className="h-px w-full bg-black" />
          <p className="font-grotesk text-body leading-7 text-black">Lobo VC Cup</p>
        </div>
      </Container>
    </footer>
  );
}

import Container from '@/components/common/Container';
import Logo from '@/components/common/Logo';
import SectionLabel from '@/components/common/SectionLabel';
import { navLinks } from '@/data/nav';
import socialIcon from '@/assets/icons/social-icon.svg';

export default function Footer() {
  return (
    <footer className="w-full rounded-t-card bg-brand-silver">
      <Container className="flex flex-col gap-10 py-10 sm:gap-12 lg:py-12">
        <div className="flex flex-col gap-8 lg:gap-12">
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

          <div className="flex flex-col gap-5 lg:gap-5">
            <SectionLabel as="h4" size="h4">
              Contact us:
            </SectionLabel>
            <div className="flex flex-col gap-3 font-grotesk text-body text-black sm:gap-4">
              <p>lobovccup@unmm.onmicrosoft.com</p>
              <p>University of New Mexico</p>
              <p>
                1155 University Blvd SE
                <br />
                Albuquerque, NM 87106
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:gap-10">
          <div className="h-px w-full bg-black" />
          <p className="font-grotesk text-body leading-7 text-black">Lobo VC Cup</p>
        </div>
      </Container>
    </footer>
  );
}

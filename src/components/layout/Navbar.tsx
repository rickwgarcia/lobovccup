import { useState } from 'react';
import Container from '@/components/common/Container';
import Logo from '@/components/common/Logo';
import Button from '@/components/common/Button';
import { navLinks } from '@/data/nav';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header id="top" className="sticky top-0 z-50 w-full bg-brand-silver">
      <Container className="flex items-center justify-between py-4 lg:h-[102px] lg:py-0">
        <Logo />

        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-grotesk text-lg leading-7 text-black hover:opacity-80"
            >
              {link.label}
            </a>
          ))}
          <Button href="#join" className="px-7 py-3 text-base lg:px-[35px] lg:py-5 lg:text-lg">
            Join Email List
          </Button>
        </nav>

        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className={`block h-0.5 w-6 bg-black transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-black transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-black transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </Container>

      {menuOpen && (
        <div className="border-t border-black/10 bg-brand-silver md:hidden">
          <Container className="flex flex-col items-start gap-6 py-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-grotesk text-lg text-black"
              >
                {link.label}
              </a>
            ))}
            <Button href="#join" className="w-full">
              Join Email List
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}

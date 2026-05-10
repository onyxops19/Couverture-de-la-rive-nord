'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { SITE } from '@/lib/constants';

const LINKS = [
  { href: '/',              label: 'Accueil' },
  { href: '/services',      label: 'Nos services' },
  { href: '/membranes',     label: 'Nos membranes' },
  { href: '/realisations',  label: 'Nos réalisations' },
  { href: '/contact',       label: 'Contact' },
];

export function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav__inner">
        <Link className="nav__logo" href="/">
          <Image src="/logo.png" alt={SITE.name} width={200} height={98} priority />
        </Link>

        <button
          className={`nav__toggle ${open ? 'is-open' : ''}`}
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span></span><span></span><span></span>
        </button>

        <ul className={`nav__list ${open ? 'is-open' : ''}`}>
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className={pathname === l.href ? 'is-active' : ''}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="nav__cta-mobile">
            <a href={`tel:${SITE.phoneRaw}`} className="btn btn--gold" onClick={() => setOpen(false)}>
              {SITE.phone}
            </a>
          </li>
        </ul>

        <a href={`tel:${SITE.phoneRaw}`} className="nav__phone-cta">Appelez maintenant</a>
      </div>
    </nav>
  );
}

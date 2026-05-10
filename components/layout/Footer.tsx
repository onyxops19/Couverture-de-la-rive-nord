import Link from 'next/link';
import Image from 'next/image';
import { SITE } from '@/lib/constants';
import { CertBadge } from '@/components/ui/CertBadge';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__col">
          <Link className="footer__logo" href="/">
            <Image src="/logo.png" alt={SITE.name} width={200} height={98} />
          </Link>

          <div className="footer__certs">
            <CertBadge>APCHQ</CertBadge>
            <CertBadge>CERTIFIÉ FIRESTONE</CertBadge>
          </div>

          <address className="footer__address">
            {SITE.address.street}<br />
            {SITE.address.city}, {SITE.address.region}, {SITE.address.postal}
          </address>

          <ul className="footer__contact">
            <li><a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a></li>
            <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li><a href={SITE.facebook} target="_blank" rel="noopener">Facebook</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Liens rapides</h4>
          <ul className="footer__links">
            <li><Link href="/services">Nos services</Link></li>
            <li><Link href="/membranes">Nos membranes</Link></li>
            <li><Link href="/realisations">Nos réalisations</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Zones desservies</h4>
          <ul className="footer__links">
            {SITE.zones.map((z) => <li key={z}>{z}</li>)}
          </ul>
        </div>
      </div>

      <div className="footer__copyright">
        <div className="container">
          © 2026 {SITE.legalName} — Tous droits réservés
        </div>
      </div>
    </footer>
  );
}

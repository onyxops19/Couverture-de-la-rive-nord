import Link from 'next/link';
import { PROMO_TEXT } from '@/lib/constants';

export function PromoBar() {
  return (
    <div className="promo-bar">
      <div className="container promo-bar__inner">
        <span className="promo-bar__text">{PROMO_TEXT}</span>
        <Link href="/contact#soumission" className="promo-bar__cta">
          Réserver <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}

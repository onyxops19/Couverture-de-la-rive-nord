import Image from 'next/image';
import Link from 'next/link';
import { RevealOnScroll } from '@/components/reveal/RevealOnScroll';
import { REALIZATIONS } from '@/lib/content';

type Props = {
  /** how many photos to render (homepage = 6, full page = 12) */
  count?: number;
  /** if true, uses 4-col grid (gallery--full); else 3-col preview */
  variant?: 'preview' | 'full';
  showLink?: boolean;
};

export function RealizationsGallery({ count = 6, variant = 'preview', showLink = true }: Props) {
  const photos =
    variant === 'preview'
      ? [REALIZATIONS[0], REALIZATIONS[1], REALIZATIONS[2], REALIZATIONS[9], REALIZATIONS[10], REALIZATIONS[11]]
      : REALIZATIONS.slice(0, count);

  const galleryClass = variant === 'full' ? 'gallery gallery--full stagger' : 'gallery stagger';

  return (
    <section className="section section--light" id="realisations">
      <div className="container">
        <RevealOnScroll as="h2" className="section__title section__title--centered">
          Nos réalisations
        </RevealOnScroll>
        <RevealOnScroll as="p" className="section__lead section__lead--short">
          Voyez notre travail en images.
        </RevealOnScroll>

        <ul className={galleryClass}>
          {photos.map((src, i) => (
            <RevealOnScroll as="li" className="gallery__item" key={src} delayMs={i * 80}>
              <Image
                src={src}
                alt={`Réalisation ${String(i + 1).padStart(2, '0')} — toiture à membrane blanche`}
                width={600}
                height={450}
              />
              <span className="gallery__overlay" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.5" y2="16.5" />
                </svg>
              </span>
            </RevealOnScroll>
          ))}
        </ul>

        {showLink && (
          <RevealOnScroll as="p" className="gallery__cta">
            <Link href="/realisations" className="link-arrow">
              Voir toutes nos réalisations <span aria-hidden="true">→</span>
            </Link>
          </RevealOnScroll>
        )}
      </div>
    </section>
  );
}

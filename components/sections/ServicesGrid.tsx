import Image from 'next/image';
import Link from 'next/link';
import { RevealOnScroll } from '@/components/reveal/RevealOnScroll';
import { SERVICES } from '@/lib/content';
import { SITE } from '@/lib/constants';

export function ServicesGrid() {
  return (
    <section className="section section--light" id="services">
      <div className="container">
        <RevealOnScroll as="h2" className="section__title section__title--centered">
          Nos services de toiture<br />
          à Laval et Montréal-Nord
        </RevealOnScroll>

        <RevealOnScroll as="p" className="section__lead">
          Expert en toiture à Laval et à Montréal-Nord, Couverture de la Rive-Nord offre des services complets pour répondre à l&apos;ensemble de vos besoins pour votre toiture. Avec notre compagnie de toiture, vous pourrez profiter d&apos;un partenaire à long terme qui vous offrira en tout temps un service d&apos;une qualité inégalée.
        </RevealOnScroll>

        <ul className="cards stagger">
          {SERVICES.map((s, i) => (
            <RevealOnScroll as="li" className="card" delayMs={i * 100} key={s.slug}>
              <Image className="card__img" src={s.image} alt={s.alt} width={800} height={500} />
              <div className="card__body">
                <h3 className="card__title">{s.title}</h3>
                <p className="card__text">{s.description}</p>
                <Link className="card__link" href={`/services#${s.slug}`}>
                  En savoir plus <span aria-hidden="true">→</span>
                </Link>
              </div>
            </RevealOnScroll>
          ))}
        </ul>
      </div>
    </section>
  );
}

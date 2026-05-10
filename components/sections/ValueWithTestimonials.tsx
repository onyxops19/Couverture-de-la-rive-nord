import Link from 'next/link';
import { TestimonialsCarousel } from '@/components/carousel/TestimonialsCarousel';
import { RevealOnScroll } from '@/components/reveal/RevealOnScroll';
import { SITE } from '@/lib/constants';

export function ValueWithTestimonials() {
  return (
    <section className="section section--light">
      <div className="container">
        <div className="value-grid">

          <RevealOnScroll className="value-grid__text">
            <h2 className="section__title">
              Qualité et fiabilité<br />
              sous un même toit !
            </h2>

            <p className="section__lead">
              Depuis plus de {SITE.yearsInBusiness} ans, Couverture de la Rive-Nord est une compagnie de toiture à Laval et à Montréal-Nord qui se spécialise dans les membranes blanches EPDM et TPO pour les toits plats et les toitures neuves. Véritable partenaire par excellence pour votre toiture, Couverture de la Rive-Nord œuvre dans le secteur résidentiel et commercial pour tous vos besoins de toiture. Notre équipe agit avec professionnalisme, minutie et courtoisie tout en vous proposant les produits les plus qualitatifs, durables et écologiques du marché.
            </p>

            <p className="section__inline-cta">
              <Link href="/services" className="link-arrow">
                En savoir plus sur nos services <span aria-hidden="true">→</span>
              </Link>
            </p>
          </RevealOnScroll>

          <RevealOnScroll className="value-grid__carousel">
            <TestimonialsCarousel />
          </RevealOnScroll>

        </div>
      </div>
    </section>
  );
}

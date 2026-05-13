import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { AdvantagesSection } from '@/components/sections/AdvantagesSection';
import { RealizationsGallery } from '@/components/sections/RealizationsGallery';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { RevealOnScroll } from '@/components/reveal/RevealOnScroll';
import { Button } from '@/components/ui/Button';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Couvreur à Laval — Couverture de la Rive-Nord',
  description: 'Couvreur professionnel à Laval depuis plus de 23 ans. Spécialiste de la toiture à membrane blanche EPDM et TPO. Soumission gratuite, certifié APCHQ.',
};

export default function CouvreurLavalPage() {
  return (
    <main>
      <PageHeader
        title="Couvreur à Laval"
        lead="Votre spécialiste de toiture sur la Rive-Nord depuis 23 ans"
      />

      <section className="section section--light">
        <div className="container">
          <RevealOnScroll as="h2" className="section__title section__title--centered">
            Couverture de la Rive-Nord à Laval
          </RevealOnScroll>
          <RevealOnScroll as="p" className="section__lead">
            Couverture de la Rive-Nord est votre couvreur de confiance à Laval et dans toute la Rive-Nord.
            Depuis plus de 23 ans, nous réalisons des projets d&apos;installation, de réfection et d&apos;entretien
            de toiture pour des résidences et des bâtiments commerciaux. Notre équipe est certifiée APCHQ,
            gage de qualité et de durabilité.
          </RevealOnScroll>
          <RevealOnScroll as="p" className="section__lead">
            Que vous ayez un toit plat à membrane blanche ou une toiture en pente, nous avons la solution
            adaptée à votre réalité climatique québécoise. Contactez-nous pour une soumission gratuite
            et sans engagement.
          </RevealOnScroll>
          <RevealOnScroll className="advantages__ctas">
            <Button variant="gold" href={`tel:${SITE.phoneRaw}`}>Appelez maintenant</Button>
            <Button variant="outline-charcoal" href="/contact">Soumission en ligne</Button>
          </RevealOnScroll>
        </div>
      </section>

      <AdvantagesSection />
      <RealizationsGallery count={6} variant="preview" showLink={true} />
      <FinalCTA
        title="Besoin d'un couvreur à Laval ?"
        sub="Soumission gratuite et sans engagement — répondez en 24h."
        ctaLabel="Obtenir une soumission"
        ctaHref="/contact"
      />
    </main>
  );
}

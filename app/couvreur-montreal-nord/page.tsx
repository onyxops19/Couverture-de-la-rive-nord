import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { AdvantagesSection } from '@/components/sections/AdvantagesSection';
import { RealizationsGallery } from '@/components/sections/RealizationsGallery';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { RevealOnScroll } from '@/components/reveal/RevealOnScroll';
import { Button } from '@/components/ui/Button';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Couvreur à Montréal-Nord — Couverture de la Rive-Nord',
  description: 'Couvreur professionnel à Montréal-Nord. Spécialiste de la toiture à membrane blanche EPDM et TPO pour toits plats. Certifié APCHQ, soumission gratuite.',
};

export default function CouvreurMontrealnordPage() {
  return (
    <main>
      <PageHeader
        title="Couvreur à Montréal-Nord"
        lead="Expert en toiture à membrane blanche depuis plus de 23 ans"
      />

      <section className="section section--light">
        <div className="container">
          <RevealOnScroll as="h2" className="section__title section__title--centered">
            Couverture de la Rive-Nord à Montréal-Nord
          </RevealOnScroll>
          <RevealOnScroll as="p" className="section__lead">
            Actifs à Montréal-Nord depuis plus de 23 ans, nous intervenons rapidement pour tous vos projets
            de toiture : installation de membranes EPDM et TPO, réfection de toits plats, réparations
            d&apos;urgence et entretien préventif. Notre expertise en membranes blanches écologiques réduit
            votre facture énergétique tout en protégeant votre bâtiment des aléas climatiques du Québec.
          </RevealOnScroll>
          <RevealOnScroll as="p" className="section__lead">
            Membre de l&apos;APCHQ, Couverture de la Rive-Nord s&apos;engage à vous offrir
            un travail irréprochable, dans les délais convenus, au meilleur rapport qualité/prix.
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
        title="Besoin d'un couvreur à Montréal-Nord ?"
        sub="Soumission gratuite et sans engagement — répondez en 24h."
        ctaLabel="Obtenir une soumission"
        ctaHref="/contact"
      />
    </main>
  );
}

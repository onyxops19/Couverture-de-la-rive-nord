import { Button } from '@/components/ui/Button';
import { SITE } from '@/lib/constants';

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__membrane" aria-hidden="true" />
      <div className="hero__overlay"></div>

      <div className="container hero__inner">
        <h1 className="hero__title reveal is-visible">
          Votre compagnie de toiture<br />
          à Laval et Montréal-Nord
        </h1>

        <p className="hero__sub reveal is-visible">
          Depuis plus de {SITE.yearsInBusiness} ans, spécialiste des membranes blanches EPDM et TPO pour toits plats.
        </p>

        <div className="hero__badges reveal is-visible">
          <span className="badge">Membre APCHQ</span>
        </div>

        <div className="hero__ctas reveal is-visible">
          <Button variant="outline-white" href={`tel:${SITE.phoneRaw}`}>Appelez maintenant</Button>
          <Button variant="gold" href="/contact">Obtenir une soumission</Button>
        </div>
      </div>
    </section>
  );
}

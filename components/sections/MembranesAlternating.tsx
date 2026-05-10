import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { RevealOnScroll } from '@/components/reveal/RevealOnScroll';

export function MembranesAlternating() {
  return (
    <section className="section section--dark" id="membranes">
      <div className="container">
        <RevealOnScroll as="h2" className="section__title section__title--centered">
          Notre spécialité :<br />
          la membrane blanche
        </RevealOnScroll>

        <RevealOnScroll as="p" className="section__lead">
          Expert en toiture à membrane blanche depuis plus de 15 ans, Couverture de la Rive-Nord vous propose les meilleurs produits pour les toits plats. Entre la membrane EPDM et la membrane TPO, deux options écologiques, durables et avec un excellent retour sur investissement. Une membrane blanche lutte contre les îlots de chaleur et résiste aux températures extrêmes du Québec.
        </RevealOnScroll>

        <RevealOnScroll className="membrane">
          <div className="membrane__media">
            <Image src="/membranes/epdm.jpg" alt="Membrane EPDM blanche" width={800} height={600} />
          </div>
          <div className="membrane__body">
            <h3 className="membrane__title">Membrane EPDM</h3>
            <p>Caoutchouc synthétique monocouche. Durée de vie jusqu&apos;à <strong>50 ans</strong> avec entretien régulier. Excellente résistance aux UV, aux températures extrêmes et à l&apos;oxydation.</p>
            <p>La couleur blanche reflète les rayons solaires, réduit la consommation énergétique et évite les îlots de chaleur. Entièrement écologique et recyclable.</p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="membrane membrane--reverse">
          <div className="membrane__media">
            <Image src="/membranes/tpo.jpg" alt="Membrane TPO blanche" width={800} height={600} />
          </div>
          <div className="membrane__body">
            <h3 className="membrane__title">Membrane TPO</h3>
            <p>Thermoplastique polyoléfine monocouche. Durée de vie ~<strong>40 ans</strong>, moins d&apos;entretien que l&apos;EPDM. Résistante au soleil, aux températures extrêmes, aux bactéries et aux insectes.</p>
            <p>Sans substance chimique, sans halogène, sans plastifiant. Solution moins dispendieuse que les revêtements traditionnels, sans compromis sur la qualité ou la durabilité.</p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="membrane__cta">
          <Button variant="gold" href="/realisations">Voir nos réalisations</Button>
        </RevealOnScroll>
      </div>
    </section>
  );
}

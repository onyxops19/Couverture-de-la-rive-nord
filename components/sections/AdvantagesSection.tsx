import { ADVANTAGES } from '@/lib/content';
import { AdvantageIcon } from '@/components/ui/AdvantageIcon';
import { Button } from '@/components/ui/Button';
import { RevealOnScroll } from '@/components/reveal/RevealOnScroll';

export function AdvantagesSection() {
  return (
    <section className="section section--dark">
      <div className="container">
        <RevealOnScroll as="h2" className="section__title section__title--centered">
          Pourquoi choisir<br />
          Couverture de la Rive-Nord ?
        </RevealOnScroll>

        <ul className="advantages stagger">
          {ADVANTAGES.map((a, i) => (
            <RevealOnScroll as="li" className="advantage" delayMs={i * 100} key={a.iconKey}>
              <AdvantageIcon kind={a.iconKey} />
              <h3 className="advantage__title">{a.title}</h3>
              <p>{a.body}</p>
            </RevealOnScroll>
          ))}
        </ul>

        <RevealOnScroll className="advantages__ctas">
          <Button variant="outline-white" href="/couvreur-laval">Couvreur Laval</Button>
          <Button variant="outline-white" href="/couvreur-montreal-nord">Couvreur Montréal-Nord</Button>
        </RevealOnScroll>
      </div>
    </section>
  );
}

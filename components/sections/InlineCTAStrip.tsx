import { Button } from '@/components/ui/Button';
import { RevealOnScroll } from '@/components/reveal/RevealOnScroll';

export function InlineCTAStrip() {
  return (
    <section className="cta-strip">
      <RevealOnScroll className="container cta-strip__inner">
        <p className="cta-strip__text">
          Votre toiture mérite un expert, obtenez une soumission gratuite aujourd&apos;hui !
        </p>
        <Button variant="charcoal" href="/contact">Obtenir une soumission</Button>
      </RevealOnScroll>
    </section>
  );
}

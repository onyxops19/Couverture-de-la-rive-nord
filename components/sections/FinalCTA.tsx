import { Button } from '@/components/ui/Button';
import { RevealOnScroll } from '@/components/reveal/RevealOnScroll';
import { SITE } from '@/lib/constants';

type Props = {
  title?: string;
  sub?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function FinalCTA({
  title = "Besoin d'un couvreur à Laval ou Montréal-Nord ?",
  sub = 'Contactez-nous dès aujourd\'hui pour une soumission gratuite.',
  ctaLabel = 'Obtenir une soumission gratuite !',
  ctaHref = `tel:${SITE.phoneRaw}`,
}: Props) {
  return (
    <section className="section section--dark final-cta" id="contact-cta">
      <RevealOnScroll className="container final-cta__inner">
        <h2 className="final-cta__title">{title}</h2>
        <p className="final-cta__sub">{sub}</p>
        <Button variant="gold" href={ctaHref} className="final-cta__btn">{ctaLabel}</Button>
      </RevealOnScroll>
    </section>
  );
}
